// ============================================
// NUAT Labs - VLSI Semiconductor Animations
// ============================================

// Configuration
const CONFIG = {
    circuit: {
        nodeCount: 30,
        connectionProbability: 0.15,
        glowDuration: 2000
    },
    electrons: {
        particleCount: 50,
        speed: 1.5,
        size: 3
    },
    signals: {
        frequency: 2,
        amplitude: 40
    }
};

// ============================================
// Circuit Board Background Animation
// ============================================
function initCircuitBoard() {
    const canvas = document.getElementById('circuitCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const connections = [];

    // Create nodes
    for (let i = 0; i < CONFIG.circuit.nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 3 + Math.random() * 2,
            glow: 0
        });
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() < CONFIG.circuit.connectionProbability) {
                connections.push({
                    from: i,
                    to: j,
                    progress: 0,
                    speed: 0.005 + Math.random() * 0.01,
                    active: Math.random() > 0.7
                });
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        connections.forEach(conn => {
            const fromNode = nodes[conn.from];
            const toNode = nodes[conn.to];

            // Draw line
            ctx.strokeStyle = conn.active ? 'rgba(0, 163, 224, 0.3)' : 'rgba(192, 192, 192, 0.2)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.stroke();

            // Draw signal pulse
            if (conn.active) {
                conn.progress += conn.speed;
                if (conn.progress > 1) conn.progress = 0;

                const x = fromNode.x + (toNode.x - fromNode.x) * conn.progress;
                const y = fromNode.y + (toNode.y - fromNode.y) * conn.progress;

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
                gradient.addColorStop(0, 'rgba(0, 255, 65, 0.8)');
                gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, 10, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Draw nodes
        nodes.forEach(node => {
            ctx.fillStyle = '#00A3E0';
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();

            // Glow effect
            if (node.glow > 0) {
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
                gradient.addColorStop(0, `rgba(0, 163, 224, ${node.glow})`);
                gradient.addColorStop(1, 'rgba(0, 163, 224, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
                ctx.fill();
                node.glow -= 0.01;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Random glow activation
    setInterval(() => {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        randomNode.glow = 0.6;
    }, 500);

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// Electron Flow Particle System
// ============================================
function initElectronFlow() {
    const canvas = document.getElementById('electronCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const particles = [];

    // Create particles
    for (let i = 0; i < CONFIG.electrons.particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * CONFIG.electrons.speed,
            vy: (Math.random() - 0.5) * CONFIG.electrons.speed,
            size: CONFIG.electrons.size,
            glow: Math.random()
        });
    }

    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            // Draw particle
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, 'rgba(0, 255, 65, 0.8)');
            gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            ctx.fill();

            // Core particle
            ctx.fillStyle = '#00FF41';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ============================================
// Signal Waveform Generators
// ============================================
function initSignalWaveforms() {
    const canvases = ['signalCanvas1', 'signalCanvas2', 'signalCanvas3'];
    const waveforms = ['sine', 'square', 'sawtooth'];

    canvases.forEach((canvasId, index) => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const waveType = waveforms[index];
        let time = 0;

        function drawWaveform() {
            // Background
            ctx.fillStyle = '#0A0A0A';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Grid lines
            ctx.strokeStyle = 'rgba(0, 163, 224, 0.1)';
            ctx.lineWidth = 1;

            // Horizontal lines
            for (let y = 0; y < canvas.height; y += 40) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Vertical lines
            for (let x = 0; x < canvas.width; x += 40) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Waveform
            ctx.strokeStyle = '#00FF41';
            ctx.lineWidth = 2;
            ctx.beginPath();

            for (let x = 0; x < canvas.width; x++) {
                let y;
                const t = (x + time) * CONFIG.signals.frequency * Math.PI / 180;

                switch (waveType) {
                    case 'sine':
                        y = canvas.height / 2 + Math.sin(t) * CONFIG.signals.amplitude;
                        break;
                    case 'square':
                        y = canvas.height / 2 + (Math.sin(t) > 0 ? 1 : -1) * CONFIG.signals.amplitude;
                        break;
                    case 'sawtooth':
                        y = canvas.height / 2 + ((t % (Math.PI * 2)) / (Math.PI * 2) * 2 - 1) * CONFIG.signals.amplitude;
                        break;
                }

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();

            // Draw glow trail at current position
            const trailX = canvas.width - 50;
            const gradient = ctx.createRadialGradient(trailX, canvas.height / 2, 0, trailX, canvas.height / 2, 30);
            gradient.addColorStop(0, 'rgba(0, 255, 65, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(trailX - 30, 0, 60, canvas.height);

            time += 2;
            requestAnimationFrame(drawWaveform);
        }

        drawWaveform();
    });
}

// ============================================
// Binary Data Stream Background
// ============================================
function initBinaryStream() {
    const container = document.querySelector('.binary-stream-bg');
    if (!container) return;

    const columns = 80;
    const streams = [];

    for (let i = 0; i < columns; i++) {
        const stream = document.createElement('div');
        stream.style.cssText = `
            position: absolute;
            left: ${(i / columns) * 100}%;
            top: ${Math.random() * 100}%;
            color: rgba(0, 163, 224, 0.3);
            font-size: 0.7rem;
            white-space: pre;
            animation: streamFall ${10 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;

        let text = '';
        for (let j = 0; j < 20; j++) {
            text += Math.random() > 0.5 ? '1' : '0';
            if (j % 8 === 7) text += '\n';
        }
        stream.textContent = text;
        container.appendChild(stream);
        streams.push(stream);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes streamFall {
            from { transform: translateY(-100%); }
            to { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Wafer Dies Generation
// ============================================
function initWaferDies() {
    const waferDies = document.querySelector('.wafer-dies');
    if (!waferDies) return;

    // Dies are created via CSS grid pattern for performance
    // This function adds interactive highlights

    waferDies.addEventListener('mouseenter', () => {
        waferDies.style.animation = 'diesPulse 2s ease-in-out infinite';
    });

    waferDies.addEventListener('mouseleave', () => {
        waferDies.style.animation = 'none';
    });
}

// ============================================
// Tech Stats Counter Animation
// ============================================
function animateCounters() {
    const statElements = document.querySelectorAll('.stat-value');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseFloat(entry.target.dataset.target);
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statElements.forEach(el => observer.observe(el));
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const isDecimal = end % 1 !== 0;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }

        element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    }, 16);
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// Success Stories Carousel
// ============================================
function initSuccessCarousel() {
    const cards = document.querySelectorAll('.success-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentIndex = 0;
    const rotationInterval = 7000;

    function showCard(index) {
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        cards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    let autoRotate = setInterval(() => {
        const nextIndex = (currentIndex + 1) % cards.length;
        showCard(nextIndex);
    }, rotationInterval);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoRotate);
            showCard(index);

            autoRotate = setInterval(() => {
                const nextIndex = (currentIndex + 1) % cards.length;
                showCard(nextIndex);
            }, rotationInterval);
        });
    });
}

// ============================================
// Mobile Navigation
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNavDrawer = document.getElementById('mobileNavDrawer');
const mobileOverlay = document.getElementById('mobileOverlay');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileNavDrawer.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNavDrawer.classList.contains('active') ? 'hidden' : '';
    });

    mobileOverlay.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// Timeline Node Interaction
// ============================================
function initTimelineNodes() {
    const nodes = document.querySelectorAll('.timeline-node');

    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const nodeData = node.dataset.node;
            node.style.transform = 'scale(1.1)';
        });

        node.addEventListener('mouseleave', () => {
            node.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// 3D Chip Hover Interaction
// ============================================
function initChipInteraction() {
    const chip = document.querySelector('.chip-3d');
    if (!chip) return;

    chip.addEventListener('mouseenter', () => {
        chip.style.animationPlayState = 'paused';
    });

    chip.addEventListener('mouseleave', () => {
        chip.style.animationPlayState = 'running';
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// Initialize All Animations
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔬 NUAT Labs - Initializing VLSI Animations...');

    // Core animations
    initCircuitBoard();
    initElectronFlow();
    initSignalWaveforms();
    initBinaryStream();
    initWaferDies();

    // Interactive features
    animateCounters();
    initScrollAnimations();
    initSuccessCarousel();
    initHeaderScroll();
    initTimelineNodes();
    initChipInteraction();
    initSmoothScroll();

    console.log('✅ Circuit board traces: Active');
    console.log('✅ Electron flow particles: Running');
    console.log('✅ Signal waveforms: Generating');
    console.log('✅ Wafer rotation: Spinning');
    console.log('✅ 3D chip animation: Flipping');
    console.log('✅ Binary data streams: Flowing');
    console.log('🎯 NUAT Labs website fully initialized!');
});

// ============================================
// Additional Enhancements
// ============================================

// Parallax effect for wafer
window.addEventListener('scroll', () => {
    const waferContainer = document.querySelector('.wafer-container');
    if (waferContainer) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;
        waferContainer.style.transform = `translateY(calc(-50% + ${scrolled * parallaxSpeed}px))`;
    }
});

// Add dies pulse animation via CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes diesPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
`;
document.head.appendChild(style);

// Heat map simulation on hover
document.querySelectorAll('.pipeline-stage, .flow-stage').forEach(stage => {
    stage.addEventListener('mouseenter', function () {
        this.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(0, 163, 224, 0.1) 100%)';
    });

    stage.addEventListener('mouseleave', function () {
        this.style.background = '';
    });
});

console.log('🚀 Advanced VLSI animations ready!');
