const express = require('express');
const router = express.Router();
const VerilogExecutor = require('../services/verilogExecutor');
const { authenticate } = require('../middleware/auth');

// Submit code for execution
router.post('/', authenticate, async (req, res) => {
    try {
        const { problemId, code, language } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!problemId || !code || !language) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (language !== 'verilog' && language !== 'systemverilog') {
            return res.status(400).json({ error: 'Unsupported language' });
        }

        // Get problem details (would be from database in production)
        const problem = await getProblem(problemId);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        // Execute code with Icarus Verilog
        console.log(`Executing code for problem ${problemId} by user ${userId}`);
        const executor = new VerilogExecutor();
        const result = await executor.execute(code, problem.testCases);

        // Save submission to database (placeholder)
        await saveSubmission({
            userId,
            problemId,
            code,
            language,
            status: result.status,
            testsPassed: result.testsPassed,
            testsTotal: result.testsTotal,
            executionTime: result.executionTime,
            compilationOutput: result.compilationOutput
        });

        // Return results
        res.json({
            success: true,
            status: result.status,
            testsPassed: result.testsPassed,
            testsTotal: result.testsTotal,
            testResults: result.testResults,
            waveformData: result.waveformData,
            compilationOutput: result.compilationOutput,
            executionTime: result.executionTime
        });

    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({
            error: 'Execution failed',
            message: error.message
        });
    }
});

// Helper functions (would be in database service)
async function getProblem(id) {
    // Mock problem data
    return {
        id: 1,
        title: "2:1 Multiplexer",
        testCases: [
            { inputs: { a: 1, b: 0, sel: 0 }, expected: { y: 1 } },
            { inputs: { a: 1, b: 0, sel: 1 }, expected: { y: 0 } },
            { inputs: { a: 0, b: 1, sel: 0 }, expected: { y: 0 } },
            { inputs: { a: 0, b: 1, sel: 1 }, expected: { y: 1 } }
        ]
    };
}

async function saveSubmission(data) {
    // Would save to database
    console.log('Submission saved:', data);
    return { id: Date.now() };
}

module.exports = router;
