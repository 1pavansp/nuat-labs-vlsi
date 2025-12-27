// Leaderboard Data
const leaderboardData = [
    { rank: 1, name: "Rahul Chen", username: "rchen", avatar: "RC", score: 3521, solved: 148, streak: 45, easy: 48, medium: 70, hard: 30 },
    { rank: 2, name: "Sarah Kim", username: "skim", avatar: "SK", score: 2847, solved: 142, streak: 28, easy: 46, medium: 68, hard: 28 },
    { rank: 3, name: "Alex Patel", username: "apatel", avatar: "AP", score: 2634, solved: 138, streak: 33, easy: 47, medium: 65, hard: 26 },
    { rank: 4, name: "Maria Rodriguez", username: "mrod", avatar: "MR", score: 2521, solved: 135, streak: 21, easy: 48, medium: 63, hard: 24 },
    { rank: 5, name: "David Zhang", username: "dzhang", avatar: "DZ", score: 2398, solved: 130, streak: 19, easy: 46, medium: 61, hard: 23 },
    { rank: 6, name: "Emma Johnson", username: "ejohn", avatar: "EJ", score: 2287, solved: 127, streak: 15, easy: 47, medium: 58, hard: 22 },
    { rank: 7, name: "Michael Lee", username: "mlee", avatar: "ML", score: 2156, solved: 124, streak: 12, easy: 48, medium: 56, hard: 20 },
    { rank: 8, name: "Sophie Martin", username: "smartin", avatar: "SM", score: 2043, solved: 119, streak: 18, easy: 46, medium: 54, hard: 19 },
    { rank: 9, name: "James Wilson", username: "jwilson", avatar: "JW", score: 1987, solved: 115, streak: 9, easy: 47, medium: 51, hard: 17 },
    { rank: 10, name: "Lisa Anderson", username: "lander", avatar: "LA", score: 1875, solved: 112, streak: 14, easy: 48, medium: 49, hard: 15 },
    { rank: 11, name: "Kevin Brown", username: "kbrown", avatar: "KB", score: 1798, solved: 108, streak: 7, easy: 46, medium: 47, hard: 15 },
    { rank: 12, name: "Nina Gupta", username: "ngupta", avatar: "NG", score: 1734, solved: 105, streak: 11, easy: 47, medium: 45, hard: 13 },
    { rank: 13, name: "Tom Harris", username: "tharris", avatar: "TH", score: 1687, solved: 102, streak: 6, easy: 48, medium: 42, hard: 12 },
    { rank: 14, name: "Amy Chen", username: "achen", avatar: "AC", score: 1643, solved: 98, streak: 10, easy: 46, medium: 40, hard: 12 },
    { rank: 15, name: "Ryan Taylor", username: "rtaylor", avatar: "RT", score: 1589, solved: 95, streak: 5, easy: 47, medium: 38, hard: 10 }
];

function renderRankings() {
    const tbody = document.getElementById('rankingsBody');
    const rankings = leaderboardData.slice(3); // Skip top 3 (shown in podium)

    tbody.innerHTML = rankings.map(user => `
        <div class="table-row">
            <div class="col-rank">#${user.rank}</div>
            <div class="col-user">
                <div class="user-avatar">${user.avatar}</div>
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-username">@${user.username}</div>
                </div>
            </div>
            <div class="col-score">${user.score.toLocaleString()}</div>
            <div class="col-solved">${user.solved}</div>
            <div class="col-streak">
                <span class="streak-badge">${user.streak} 🔥</span>
            </div>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderRankings();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // In real app, would fetch different data based on filter
        });
    });
});
