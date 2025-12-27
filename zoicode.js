// ============================================
// ZOI Code - VLSI Coding Platform
// ============================================

// VLSI Problems Database
const vlsiProblems = [
    // Easy Problems
    {
        id: 1,
        title: "Design a 2:1 Multiplexer",
        difficulty: "easy",
        category: "rtl",
        tags: ["Verilog", "Gates", "Combinational"],
        acceptance: 87,
        submissions: 12400,
        status: null,
        description: "Implement a 2-to-1 multiplexer using Verilog"
    },
    {
        id: 2,
        title: "4-bit Ripple Carry Adder",
        difficulty: "easy",
        category: "rtl",
        tags: ["Verilog", "Arithmetic", "Combinational"],
        acceptance: 82,
        submissions: 10200,
        status: "solved"
    },
    {
        id: 3,
        title: "D Flip-Flop with Reset",
        difficulty: "easy",
        category: "rtl",
        tags: ["Verilog", "Sequential", "Flip-Flop"],
        acceptance: 91,
        submissions: 15600,
        status: "solved"
    },
    {
        id: 4,
        title: "Implement Half Adder",
        difficulty: "easy",
        category: "rtl",
        tags: ["VHDL", "Gates", "Basics"],
        acceptance: 94,
        submissions: 18200,
        status: null
    },
    {
        id: 5,
        title: "8-bit Shift Register",
        difficulty: "easy",
        category: "rtl",
        tags: ["Verilog", "Sequential", "Register"],
        acceptance: 78,
        submissions: 8900,
        status: "attempted"
    },

    // Medium Problems
    {
        id: 6,
        title: "Parameterizable FIFO",
        difficulty: "medium",
        category: "rtl",
        tags: ["Verilog", "Memory", "Pointers"],
        acceptance: 45,
        submissions: 7800,
        status: null
    },
    {
        id: 7,
        title: "Traffic Light FSM",
        difficulty: "medium",
        category: "fsm",
        tags: ["Verilog", "FSM", "State Machine"],
        acceptance: 62,
        submissions: 9200,
        status: "solved"
    },
    {
        id: 8,
        title: "UART Transmitter",
        difficulty: "medium",
        category: "rtl",
        tags: ["Verilog", "Protocol", "Serial"],
        acceptance: 51,
        submissions: 6500,
        status: null
    },
    {
        id: 9,
        title: "Gray Code Counter",
        difficulty: "medium",
        category: "cdc",
        tags: ["Verilog", "Counter", "CDC"],
        acceptance: 58,
        submissions: 5400,
        status: "attempted"
    },
    {
        id: 10,
        title: "Clock Divider with Duty Cycle",
        difficulty: "medium",
        category: "rtl",
        tags: ["Verilog", "Clock", "Division"],
        acceptance: 54,
        submissions: 4900,
        status: null
    },
    {
        id: 11,
        title: "Simple Testbench for Adder",
        difficulty: "medium",
        category: "verification",
        tags: ["SystemVerilog", "Testbench", "Verification"],
        acceptance: 69,
        submissions: 8100,
        status: null
    },
    {
        id: 12,
        title: "Vending Machine FSM",
        difficulty: "medium",
        category: "fsm",
        tags: ["Verilog", "FSM", "Controller"],
        acceptance: 48,
        submissions: 5600,
        status: null
    },

    // Hard Problems
    {
        id: 13,
        title: "Cache Controller with LRU",
        difficulty: "hard",
        category: "rtl",
        tags: ["Verilog", "Memory", "Cache", "LRU"],
        acceptance: 28,
        submissions: 3200,
        status: null
    },
    {
        id: 14,
        title: "AXI4 Slave Interface",
        difficulty: "hard",
        category: "rtl",
        tags: ["SystemVerilog", "Protocol", "AXI4"],
        acceptance: 22,
        submissions: 2100,
        status: null
    },
    {
        id: 15,
        title: "NoC Router with Virtual Channels",
        difficulty: "hard",
        category: "physical",
        tags: ["Verilog", "NoC", "Routing"],
        acceptance: 19,
        submissions: 1800,
        status: null
    },
    {
        id: 16,
        title: "Clock Domain Crossing Synchronizer",
        difficulty: "hard",
        category: "cdc",
        tags: ["Verilog", "CDC", "Metastability"],
        acceptance: 35,
        submissions: 2900,
        status: null
    },
    {
        id: 17,
        title: "Power Gating Controller",
        difficulty: "hard",
        category: "lowpower",
        tags: ["Verilog", "Power", "Gating"],
        acceptance: 31,
        submissions: 2400,
        status: null
    },
    {
        id: 18,
        title: "UVM Testbench for UART",
        difficulty: "hard",
        category: "verification",
        tags: ["SystemVerilog", "UVM", "Advanced"],
        acceptance: 26,
        submissions: 1900,
        status: null
    }
];

// ============================================
// Logic Gate Canvas Animation
// ============================================
function initLogicGateCanvas() {
    const canvas = document.getElementById('logicGateCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 600;

    const gates = [];
    const signals = [];

    // Create logic gates
    class LogicGate {
        constructor(x, y, type) {
            this.x = x;
            this.y = y;
            this.type = type; // 'and', 'or', 'xor'
            this.width = 40;
            this.height = 30;
            this.alpha = 0.3 + Math.random() * 0.3;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.strokeStyle = '#0066CC';
            ctx.lineWidth = 2;

            // Draw gate shape
            ctx.beginPath();
            if (this.type === 'and') {
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + 20, this.y);
                ctx.arc(this.x + 20, this.y + 15, 15, -Math.PI / 2, Math.PI / 2);
                ctx.lineTo(this.x, this.y + 30);
                ctx.closePath();
            } else if (this.type === 'or') {
                ctx.moveTo(this.x, this.y);
                ctx.quadraticCurveTo(this.x + 20, this.y + 15, this.x, this.y + 30);
                ctx.lineTo(this.x, this.y + 30);
                ctx.quadraticCurveTo(this.x + 25, this.y + 15, this.x + 40, this.y + 15);
                ctx.quadraticCurveTo(this.x + 25, this.y + 15, this.x, this.y);
            }
            ctx.stroke();
            ctx.restore();
        }
    }

    // Create signal pulse
    class SignalPulse {
        constructor(startX, startY, endX, endY) {
            this.startX = startX;
            this.startY = startY;
            this.endX = endX;
            this.endY = endY;
            this.progress = 0;
            this.speed = 0.01 + Math.random() * 0.01;
        }

        update() {
            this.progress += this.speed;
            if (this.progress > 1) {
                this.progress = 0;
            }
        }

        draw() {
            const x = this.startX + (this.endX - this.startX) * this.progress;
            const y = this.startY + (this.endY - this.startY) * this.progress;

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
            gradient.addColorStop(0, 'rgba(0, 255, 65, 0.8)');
            gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize gates
    const gateTypes = ['and', 'or', 'and', 'or'];
    for (let i = 0; i < 12; i++) {
        gates.push(new LogicGate(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            gateTypes[Math.floor(Math.random() * gateTypes.length)]
        ));
    }

    // Initialize signals
    for (let i = 0; i < 8; i++) {
        signals.push(new SignalPulse(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connection lines
        ctx.strokeStyle = 'rgba(0, 102, 204, 0.1)';
        ctx.lineWidth = 1;
        gates.forEach((gate, i) => {
            if (i < gates.length - 1) {
                ctx.beginPath();
                ctx.moveTo(gate.x + gate.width, gate.y + 15);
                ctx.lineTo(gates[i + 1].x, gates[i + 1].y + 15);
                ctx.stroke();
            }
        });

        // Draw gates
        gates.forEach(gate => gate.draw());

        // Draw and update signals
        signals.forEach(signal => {
            signal.update();
            signal.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
    });
}

// ============================================
// Problem List Generation
// ============================================
function renderProblems(filter = 'all') {
    const problemsList = document.getElementById('problemsList');
    if (!problemsList) return;

    const filteredProblems = filter === 'all'
        ? vlsiProblems
        : vlsiProblems.filter(p => p.difficulty === filter);

    problemsList.innerHTML = filteredProblems.map(problem => `
        <a href="problem.html?id=${problem.id}" class="problem-item" data-difficulty="${problem.difficulty}" style="text-decoration: none; color: inherit;">
            <div class="problem-status ${problem.status || ''}">
                ${problem.status === 'solved' ? '✓' : problem.status === 'attempted' ? '○' : ''}
            </div>
            <div class="problem-info">
                <div class="problem-title">
                    ${problem.id}. ${problem.title}
                </div>
                <div class="problem-tags">
                    ${problem.tags.map(tag => `<span class="problem-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="problem-metrics">
                <div class="metric">
                    <span class="metric-icon">✓</span>
                    <span>${problem.acceptance}%</span>
                </div>
                <div class="metric">
                    <span class="metric-icon">👥</span>
                    <span>${(problem.submissions / 1000).toFixed(1)}K</span>
                </div>
            </div>
            <div class="difficulty-badge difficulty-${problem.difficulty}">
                ${problem.difficulty}
            </div>
        </a>
    `).join('');

    // Add hover animation
    document.querySelectorAll('.problem-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.animation = 'pulse 0.3s ease';
        });
        item.addEventListener('mouseleave', () => {
            item.style.animation = '';
        });
    });
}

// ============================================
// Filter Functionality
// ============================================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter problems
            const filter = btn.dataset.filter;
            renderProblems(filter);
        });
    });
}

// ============================================
// Category Card Interactions
// ============================================
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(0, 102, 204, 0.3);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
            `;
            card.style.position = 'relative';
            card.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

            // Filter by category (future enhancement)
            console.log(`Category selected: ${category}`);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Smooth Header Scroll
// ============================================
function initHeaderScroll() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 ZOI Code - VLSI Coding Platform Initialized');

    // Initialize animations
    initLogicGateCanvas();

    // Initialize interactions
    initFilters();
    initCategoryCards();
    initHeaderScroll();

    // Render initial problems list
    renderProblems('all');

    console.log('✅ Loaded ' + vlsiProblems.length + ' VLSI challenges');
    console.log('💎 Ready for semiconductor coding practice!');
});

// Export for potential future use
window.ZOICode = {
    problems: vlsiProblems,
    renderProblems,
    filterProblems: (filter) => renderProblems(filter)
};
