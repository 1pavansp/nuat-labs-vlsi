// ============================================
// Admin Dashboard JavaScript
// ============================================

// Check authentication
if (localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// Load admin info
document.getElementById('adminName').textContent = localStorage.getItem('adminUsername') || 'Admin';

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminLoginTime');
    window.location.href = 'login.html';
});

// ============================================
// Navigation
// ============================================
function switchView(viewName) {
    // Hide all views
    document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));

    // Show selected view
    document.getElementById(`view-${viewName}`).classList.add('active');

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
}

// Nav item clicks
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.dataset.view;
        switchView(view);

        // Load data for that view
        if (view === 'problems') {
            loadProblems();
        }
    });
});

// ============================================
// Problems Management
// ============================================
let problems = JSON.parse(localStorage.getItem('adminProblems')) || [
    {
        id: 1,
        title: "Design a 2:1 Multiplexer",
        difficulty: "easy",
        category: "rtl",
        tags: ["Verilog", "Gates", "Combinational"],
        description: "Implement a 2-to-1 multiplexer using Verilog",
        template: "module mux_2to1(\n    input wire a,\n    input wire b,\n    input wire sel,\n    output wire y\n);\n    // Your code here\nendmodule",
        constraints: "Use combinational logic only",
        hints: ["Use ternary operator", "Think about conditional assignment"]
    }
];

let editingProblemId = null;

function loadProblems() {
    const container = document.getElementById('problemsList');
    if (!container) return;

    container.innerHTML = problems.map(p => `
        <div class="problem-card">
            <div class="problem-info">
                <h3>${p.title}</h3>
                <div class="problem-meta">
                    <span class="difficulty-badge difficulty-${p.difficulty}">${p.difficulty}</span>
                    <span>Category: ${p.category}</span>
                    <span>${p.tags ? p.tags.join(', ') : ''}</span>
                </div>
            </div>
            <div class="problem-actions">
                <button class="btn-icon" onclick="editProblem(${p.id})" title="Edit">✏️</button>
                <button class="btn-icon" onclick="deleteProblem(${p.id})" title="Delete">🗑️</button>
            </div>
        </div>
    `).join('');
}

function saveProblem(problemData) {
    if (editingProblemId !== null) {
        // Update existing
        const index = problems.findIndex(p => p.id === editingProblemId);
        problems[index] = { ...problems[index], ...problemData };
    } else {
        // Add new
        const newId = problems.length > 0 ? Math.max(...problems.map(p => p.id)) + 1 : 1;
        problems.push({ id: newId, ...problemData });
    }

    localStorage.setItem('adminProblems', JSON.stringify(problems));
    loadProblems();
}

function editProblem(id) {
    const problem = problems.find(p => p.id === id);
    if (!problem) return;

    editingProblemId = id;
    document.getElementById('modalTitle').textContent = 'Edit Problem';

    document.getElementById('problemTitle').value = problem.title;
    document.getElementById('problemDifficulty').value = problem.difficulty;
    document.getElementById('problemCategory').value = problem.category;
    document.getElementById('problemTags').value = problem.tags ? problem.tags.join(', ') : '';
    document.getElementById('problemDescription').value = problem.description || '';
    document.getElementById('problemTemplate').value = problem.template || '';
    document.getElementById('problemConstraints').value = problem.constraints || '';
    document.getElementById('problemHints').value = problem.hints ? problem.hints.join('\n') : '';

    document.getElementById('problemModal').classList.add('active');
}

function deleteProblem(id) {
    if (!confirm('Are you sure you want to delete this problem?')) return;

    problems = problems.filter(p => p.id !== id);
    localStorage.setItem('adminProblems', JSON.stringify(problems));
    loadProblems();
}

// Add Problem Button
document.getElementById('btnAddProblem').addEventListener('click', () => {
    editingProblemId = null;
    document.getElementById('modalTitle').textContent = 'Add New Problem';
    document.getElementById('problemForm').reset();
    document.getElementById('problemModal').classList.add('active');
});

// Close Modal
document.getElementById('btnCloseModal').addEventListener('click', () => {
    document.getElementById('problemModal').classList.remove('active');
});

document.getElementById('btnCancelProblem').addEventListener('click', () => {
    document.getElementById('problemModal').classList.remove('active');
});

// Form Submit
document.getElementById('problemForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const problemData = {
        title: document.getElementById('problemTitle').value,
        difficulty: document.getElementById('problemDifficulty').value,
        category: document.getElementById('problemCategory').value,
        tags: document.getElementById('problemTags').value.split(',').map(t => t.trim()).filter(t => t),
        description: document.getElementById('problemDescription').value,
        template: document.getElementById('problemTemplate').value,
        constraints: document.getElementById('problemConstraints').value,
        hints: document.getElementById('problemHints').value.split('\n').filter(h => h.trim())
    };

    saveProblem(problemData);
    document.getElementById('problemModal').classList.remove('active');

    // Show success message
    alert('Problem saved successfully!');
});

// ============================================
// Dashboard Stats
// ============================================
function updateStats() {
    document.getElementById('statsProblems').textContent = problems.length;
    // Other stats would come from backend in production
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    loadProblems();
});

// Export for external use
window.editProblem = editProblem;
window.deleteProblem = deleteProblem;
