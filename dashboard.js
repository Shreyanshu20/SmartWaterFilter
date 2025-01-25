// Check authentication
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.dataset.section;
            showSection(section);
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    });

    // Initialize charts
    initializeCharts();
});

function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector(`#${sectionId}`).classList.add('active');
}

function initializeCharts() {
    // Your Chart.js initialization code here
}