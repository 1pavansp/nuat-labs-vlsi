// ============================================
// ZOI Code - Problem Solver & Simulator
// ============================================

// Test cases for the current problem
const testCases = [
    { a: 1, b: 0, sel: 0, expected: 1 },
    { a: 1, b: 0, sel: 1, expected: 0 },
    { a: 0, b: 1, sel: 0, expected: 0 },
    { a: 0, b: 1, sel: 1, expected: 1 }
];

let currentTest = 0;
let simulationResults = [];

// ============================================
// Tab Navigation
// ============================================
function initTabs() {
    // Description tabs
    document.querySelectorAll('.desc-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.desc-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.description-content').forEach(c => c.classList.add('hidden'));

            tab.classList.add('active');
            const targetId = tab.dataset.tab;
            document.getElementById(targetId).classList.remove('hidden');
        });
    });

    // Panel tabs
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.panel-content').forEach(c => c.classList.add('hidden'));

            tab.classList.add('active');
            document.getElementById(`panel-${tab.dataset.panel}`).classList.remove('hidden');
        });
    });

    // Test case tabs
    document.querySelectorAll('.test-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.test-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const testIndex = parseInt(tab.dataset.test) - 1;
            updateTestCaseDisplay(testIndex);
        });
    });
}

function updateTestCaseDisplay(index) {
    const test = testCases[index];
    const content = document.querySelector('.test-case-content');
    content.innerHTML = `
        <div class="test-inputs">
            <h4>Input:</h4>
            <code>a = ${test.a}, b = ${test.b}, sel = ${test.sel}</code>
        </div>
        <div class="test-expected">
            <h4>Expected Output:</h4>
            <code>y = ${test.expected}</code>
        </div>
    `;
    currentTest = index;
}

// ============================================
// Verilog Simulator (Mock)
// ============================================
function simulateVerilog(code) {
    // Basic Verilog parser - looks for specific patterns
    const results = [];

    // Check if code has the basic structure
    if (!code.includes('module') || !code.includes('endmodule')) {
        return { error: 'Invalid module structure' };
    }

    // Try to extract logic (very simplified)
    const hasAssign = code.includes('assign');
    const hasTernary = code.includes('?') && code.includes(':');
    const hasAlways = code.includes('always');

    if (!hasAssign && !hasAlways) {
        return { error: 'No logic implementation found' };
    }

    // Simulate each test case
    testCases.forEach((test, index) => {
        let output;

        // Simple simulation logic for 2:1 MUX
        // Check if the code implements correct logic
        if (hasTernary || hasAssign) {
            // Assume correct implementation if ternary or assign is used
            output = test.sel === 1 ? test.b : test.a;
        } else {
            // Random for demonstration
            output = Math.random() > 0.5 ? 1 : 0;
        }

        const passed = output === test.expected;

        results.push({
            testNumber: index + 1,
            inputs: { a: test.a, b: test.b, sel: test.sel },
            expected: test.expected,
            actual: output,
            passed: passed
        });
    });

    return { results, success: true };
}

// ============================================
// Synthesis Metrics Calculator
// ============================================
function calculateMetrics(code, techNode = '7nm') {
    // Mock synthesis calculations
    const codeLines = code.split('\n').filter(l => l.trim() && !l.trim().startsWith('//')).length;

    const techFactors = {
        '3nm': { power: 0.5, area: 0.3, delay: 0.7 },
        '7nm': { power: 1.0, area: 1.0, delay: 1.0 },
        '28nm': { power: 3.5, area: 4.0, delay: 2.5 }
    };

    const factor = techFactors[techNode] || techFactors['7nm'];

    return {
        gateCount: Math.ceil(codeLines * 2.5),
        power: (codeLines * 0.15 * factor.power).toFixed(2),
        area: (codeLines * 12.5 * factor.area).toFixed(1),
        delay: (0.25 * factor.delay).toFixed(3)
    };
}

// ============================================
// Waveform Generator
// ============================================
function generateWaveform() {
    const canvas = document.getElementById('waveformCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;

    // Clear canvas
    ctx.fillStyle = '#1F2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Define signals
    const signals = [
        { name: 'clk', values: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1], color: '#10B981' },
        { name: 'a', values: [1, 1, 1, 1, 0, 0, 0, 0, 1, 1], color: '#3B82F6' },
        { name: 'b', values: [0, 0, 1, 1, 1, 1, 0, 0, 0, 1], color: '#8B5CF6' },
        { name: 'sel', values: [0, 0, 0, 0, 1, 1, 1, 1, 0, 0], color: '#F59E0B' },
        { name: 'y', values: [1, 1, 1, 1, 1, 1, 0, 0, 1, 1], color: '#EF4444' }
    ];

    const signalHeight = 30;
    const yOffset = 20;
    const timeStep = canvas.width / 10;

    signals.forEach((signal, sigIndex) => {
        const y = yOffset + sigIndex * signalHeight;

        // Draw signal name
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '12px JetBrains Mono';
        ctx.fillText(signal.name, 10, y + 15);

        // Draw waveform
        ctx.strokeStyle = signal.color;
        ctx.lineWidth = 2;
        ctx.beginPath();

        const xStart = 80;
        for (let i = 0; i < signal.values.length; i++) {
            const x = xStart + i * timeStep;
            const val = signal.values[i];
            const nextVal = signal.values[i + 1];

            const high = y + 5;
            const low = y + 25;
            const currentY = val === 1 ? high : low;
            const nextY = nextVal === 1 ? high : low;

            if (i === 0) {
                ctx.moveTo(x, currentY);
            }

            // Horizontal line
            ctx.lineTo(x + timeStep, currentY);

            // Vertical transition
            if (nextVal !== undefined && nextVal !== val) {
                ctx.lineTo(x + timeStep, nextY);
            }
        }

        ctx.stroke();
    });

    // Draw time markers
    ctx.fillStyle = '#6B7280';
    ctx.font = '10px JetBrains Mono';
    for (let i = 0; i <= 10; i++) {
        const x = 80 + i * timeStep;
        ctx.fillText(`${i * 10}ns`, x - 10, canvas.height - 5);
    }
}

// ============================================
// Run Code Handler
// ============================================
async function runCode() {
    const code = document.getElementById('codeTextarea').value;
    const runBtn = document.getElementById('runBtn');
    const resultsList = document.getElementById('resultsList');
    const statusEl = document.querySelector('.result-status');

    // Show loading
    runBtn.disabled = true;
    runBtn.textContent = '⏳ Running...';

    // Switch to results tab
    document.querySelector('[data-panel="results"]').click();

    // Simulate compilation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Run simulation
    const simulation = simulateVerilog(code);

    if (simulation.error) {
        statusEl.innerHTML = `
            <span class="status-icon">❌</span>
            <span class="status-error">Compilation Error: ${simulation.error}</span>
        `;
        resultsList.innerHTML = `<p class="empty-message" style="color: #EF4444;">Fix the errors and try again.</p>`;
        runBtn.disabled = false;
        runBtn.textContent = '▶ Run Code';
        return;
    }

    const results = simulation.results;
    const allPassed = results.every(r => r.passed);
    const passedCount = results.filter(r => r.passed).length;

    // Update status
    if (allPassed) {
        statusEl.innerHTML = `
            <span class="status-icon status-success">✓</span>
            <span class="status-success">All tests passed! (${passedCount}/${results.length})</span>
        `;
    } else {
        statusEl.innerHTML = `
            <span class="status-icon status-error">✗</span>
            <span class="status-error">Some tests failed (${passedCount}/${results.length} passed)</span>
        `;
    }

    // Display results
    resultsList.innerHTML = results.map(r => `
        <div class="result-item ${r.passed ? 'pass' : 'fail'}">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>Test ${r.testNumber}</strong>
                <span style="font-weight: 700; color: ${r.passed ? '#10B981' : '#EF4444'};">
                    ${r.passed ? '✓ PASS' : '✗ FAIL'}
                </span>
            </div>
            <div style="font-family: 'JetBrains Mono'; font-size: 0.75rem; color: #6B7280;">
                Input: a=${r.inputs.a}, b=${r.inputs.b}, sel=${r.inputs.sel}<br>
                Expected: ${r.expected} | Got: ${r.actual}
            </div>
        </div>
    `).join('');

    // Generate waveform
    generateWaveform();

    // Calculate synthesis metrics
    const techNode = document.querySelector('.tech-selector').value;
    const metrics = calculateMetrics(code, techNode);

    document.getElementById('gateCount').textContent = metrics.gateCount;
    document.getElementById('powerValue').textContent = metrics.power;
    document.getElementById('areaValue').textContent = metrics.area;
    document.getElementById('delayValue').textContent = metrics.delay;

    // Synthesis log
    const log = document.getElementById('synthesisLog');
    log.innerHTML = `
        <p class="log-line">Starting synthesis...</p>
        <p class="log-line">Analyzing RTL design...</p>
        <p class="log-line">Mapping to ${techNode} technology library...</p>
        <p class="log-line">Optimizing logic...</p>
        <p class="log-line">Gate-level netlist generated: ${metrics.gateCount} gates</p>
        <p class="log-line" style="color: #10B981;">✓ Synthesis complete!</p>
    `;

    // Re-enable button
    runBtn.disabled = false;
    runBtn.textContent = '▶ Run Code';

    // Success animation
    if (allPassed) {
        confetti();
    }
}

// ============================================
// Success Confetti
// ============================================
function confetti() {
    // Simple confetti effect
    const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];
    const container = document.body;

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}%;
            animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
            z-index: 10000;
            opacity: 0.8;
        `;
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

// Add confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            top: 100vh;
            transform: rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Line Numbers Sync
// ============================================
function updateLineNumbers() {
    const textarea = document.getElementById('codeTextarea');
    const lineNumbers = document.getElementById('lineNumbers');
    const lines = textarea.value.split('\n').length;

    lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) =>
        `<div>${i + 1}</div>`
    ).join('');
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 ZOI Code Problem Solver Initialized');

    initTabs();
    updateLineNumbers();

    // Event listeners
    document.getElementById('runBtn').addEventListener('click', runCode);
    document.getElementById('submitBtn').addEventListener('click', () => {
        alert('Submit functionality coming soon! This would save your solution and update your profile.');
    });

    document.getElementById('codeTextarea').addEventListener('input', updateLineNumbers);
    document.getElementById('codeTextarea').addEventListener('scroll', function () {
        document.getElementById('lineNumbers').scrollTop = this.scrollTop;
    });

    // Tech node selector
    document.querySelector('.tech-selector').addEventListener('change', (e) => {
        const code = document.getElementById('codeTextarea').value;
        if (code.trim() === '') return;

        const metrics = calculateMetrics(code, e.target.value);
        document.getElementById('gateCount').textContent = metrics.gateCount;
        document.getElementById('powerValue').textContent = metrics.power;
        document.getElementById('areaValue').textContent = metrics.area;
        document.getElementById('delayValue').textContent = metrics.delay;
    });

    console.log('✅ Ready to solve VLSI problems!');
});
