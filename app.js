document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');

    // Login Form Handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const credentials = {
            username: document.getElementById('username').value,
            password: document.getElementById('userPassword').value,
            wifiName: document.getElementById('wifiName').value,
            wifiPassword: document.getElementById('wifiPassword').value
        };

        // Here you would typically validate and send credentials to server
        console.log('Credentials submitted:', credentials);
        
        // Hide login, show dashboard
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        
        // Show initial dashboard section
        document.getElementById('dashboard').classList.add('active');
    });

    // Navigation Handler
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            e.target.classList.add('active');
            
            // Show corresponding section
            const targetId = e.target.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });
});