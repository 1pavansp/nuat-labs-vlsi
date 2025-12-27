const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class VerilogExecutor {
    constructor() {
        this.tempDir = process.env.TEMP_FILES_DIR || './temp';
        this.vcdDir = process.env.VCD_OUTPUT_DIR || './vcd_files';
        this.timeout = parseInt(process.env.EXECUTION_TIMEOUT) || 30000;
        this.ensureDirectories();
    }

    async ensureDirectories() {
        try {
            await fs.mkdir(this.tempDir, { recursive: true });
            await fs.mkdir(this.vcdDir, { recursive: true });
        } catch (error) {
            console.error('Error creating directories:', error);
        }
    }

    /**
     * Execute Verilog code with test cases
     * @param {string} userCode - User's Verilog code
     * @param {Array} testCases - Test cases to run
     * @returns {Promise<Object>} Execution results
     */
    async execute(userCode, testCases) {
        const executionId = uuidv4();
        const workDir = path.join(this.tempDir, executionId);

        try {
            // Create working directory
            await fs.mkdir(workDir, { recursive: true });

            // Generate testbench
            const testbench = this.generateTestbench(userCode, testCases);

            // Write files
            const designFile = path.join(workDir, 'design.v');
            const testbenchFile = path.join(workDir, 'testbench.v');
            const vcdFile = path.join(workDir, 'output.vcd');
            const outputFile = path.join(workDir, 'output.vvp');

            await fs.writeFile(designFile, userCode);
            await fs.writeFile(testbenchFile, testbench);

            // Compile with Icarus Verilog
            console.log(`[${executionId}] Compiling Verilog...`);
            const compileOutput = await this.runCommand(
                `iverilog -o ${outputFile} -g2009 ${designFile} ${testbenchFile}`,
                workDir
            );

            // Run simulation
            console.log(`[${executionId}] Running simulation...`);
            const simOutput = await this.runCommand(
                `vvp ${outputFile}`,
                workDir
            );

            // Parse results
            const testResults = this.parseTestResults(simOutput);
            const waveformData = await this.parseVCD(vcdFile);

            // Calculate metrics
            const testsPassed = testResults.filter(r => r.passed).length;
            const testsTotal = testResults.length;
            const status = testsPassed === testsTotal ? 'accepted' : 'wrong_answer';

            return {
                success: true,
                status,
                testsPassed,
                testsTotal,
                testResults,
                waveformData,
                compilationOutput: compileOutput,
                simulationOutput: simOutput,
                executionTime: Date.now()
            };

        } catch (error) {
            console.error(`[${executionId}] Execution error:`, error);
            return {
                success: false,
                status: 'compilation_error',
                testsPassed: 0,
                testsTotal: testCases.length,
                testResults: [],
                waveformData: null,
                compilationOutput: error.message,
                error: error.message
            };
        } finally {
            // Cleanup
            setTimeout(() => this.cleanup(workDir), 5000);
        }
    }

    /**
     * Generate testbench from test cases
     */
    generateTestbench(userCode, testCases) {
        // Extract module name
        const moduleMatch = userCode.match(/module\s+(\w+)/);
        const moduleName = moduleMatch ? moduleMatch[1] : 'dut';

        // Extract ports (simplified)
        const portsMatch = userCode.match(/module\s+\w+\s*\(([\s\S]*?)\);/);
        const portsStr = portsMatch ? portsMatch[1] : '';

        const inputs = [];
        const outputs = [];

        portsStr.split(',').forEach(port => {
            const trimmed = port.trim();
            if (trimmed.includes('input')) {
                const nameMatch = trimmed.match(/(\w+)\s*$/);
                if (nameMatch) inputs.push(nameMatch[1]);
            } else if (trimmed.includes('output')) {
                const nameMatch = trimmed.match(/(\w+)\s*$/);
                if (nameMatch) outputs.push(nameMatch[1]);
            }
        });

        // Generate testbench
        let tb = `\`timescale 1ns/1ps

module testbench;
    // Inputs
    ${inputs.map(i => `reg ${i};`).join('\n    ')}
    
    // Outputs
    ${outputs.map(o => `wire ${o};`).join('\n    ')}
    
    // Instantiate module
    ${moduleName} dut (
        ${inputs.map(i => `.${i}(${i})`).join(',\n        ')}${inputs.length > 0 && outputs.length > 0 ? ',' : ''}
        ${outputs.map(o => `.${o}(${o})`).join(',\n        ')}
    );
    
    // VCD dump
    initial begin
        $dumpfile("output.vcd");
        $dumpvars(0, testbench);
    end
    
    // Test cases
    initial begin
        $display("Starting simulation...");
        
`;

        testCases.forEach((tc, i) => {
            tb += `        // Test case ${i + 1}\n`;
            Object.entries(tc.inputs).forEach(([key, value]) => {
                tb += `        ${key} = ${value};\n`;
            });
            tb += `        #10;\n`;

            // Check outputs
            Object.entries(tc.expected).forEach(([key, value]) => {
                tb += `        if (${key} !== ${value}) begin\n`;
                tb += `            $display("FAIL: Test ${i + 1} - Expected ${key}=${value}, got %b", ${key});\n`;
                tb += `        end else begin\n`;
                tb += `            $display("PASS: Test ${i + 1}");\n`;
                tb += `        end\n`;
            });
            tb += `\n`;
        });

        tb += `        $display("Simulation complete");
        $finish;
    end
endmodule
`;

        return tb;
    }

    /**
     * Run shell command with timeout
     */
    runCommand(command, cwd) {
        return new Promise((resolve, reject) => {
            exec(command, { cwd, timeout: this.timeout }, (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(stderr || error.message));
                } else {
                    resolve(stdout);
                }
            });
        });
    }

    /**
     * Parse test results from simulation output
     */
    parseTestResults(output) {
        const results = [];
        const lines = output.split('\n');

        lines.forEach(line => {
            if (line.includes('PASS:')) {
                const match = line.match(/Test (\d+)/);
                if (match) {
                    results.push({ testNumber: parseInt(match[1]), passed: true, message: line });
                }
            } else if (line.includes('FAIL:')) {
                const match = line.match(/Test (\d+)/);
                if (match) {
                    results.push({ testNumber: parseInt(match[1]), passed: false, message: line });
                }
            }
        });

        return results;
    }

    /**
     * Parse VCD file for waveform data
     */
    async parseVCD(vcdPath) {
        try {
            const vcdContent = await fs.readFile(vcdPath, 'utf-8');

            // Simplified VCD parsing
            const signals = [];
            const lines = vcdContent.split('\n');

            lines.forEach(line => {
                if (line.startsWith('$var')) {
                    const parts = line.split(' ');
                    if (parts.length >= 5) {
                        signals.push({
                            id: parts[3],
                            name: parts[4],
                            values: []
                        });
                    }
                }
            });

            return { signals, raw: vcdContent };
        } catch (error) {
            console.error('VCD parsing error:', error);
            return null;
        }
    }

    /**
     * Cleanup temporary files
     */
    async cleanup(dir) {
        try {
            await fs.rm(dir, { recursive: true, force: true });
            console.log(`Cleaned up: ${dir}`);
        } catch (error) {
            console.error('Cleanup error:', error);
        }
    }
}

module.exports = VerilogExecutor;
