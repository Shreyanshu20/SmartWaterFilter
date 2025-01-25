// Add Chart.js library
import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');

    // Toast Notification Function
    const showToast = (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    // Single Login Form Handler
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Form submitted');  // Debug log
            
            const formData = {
                username: document.getElementById('username').value,
                password: document.getElementById('userPassword').value,
                wifiName: document.getElementById('wifiName').value,
                wifiPassword: document.getElementById('wifiPassword').value
            };

            if (Object.values(formData).every(value => value)) {
                const loadingSpinner = document.createElement('div');
                loadingSpinner.className = 'loader';
                loginForm.appendChild(loadingSpinner);

                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Hide login, show dashboard
                    loginSection.classList.add('hidden');
                    dashboardSection.classList.remove('hidden');
                    
                    // Show initial dashboard
                    const dashboardContent = document.getElementById('dashboard');
                    if (dashboardContent) {
                        dashboardContent.classList.add('active');
                    }
                    
                    showToast('Successfully logged in!', 'success');
                    
                    // Initialize dashboard elements
                    updateProgress();
                    if (typeof Chart !== 'undefined') {
                        initCharts();
                    }
                    
                    console.log('Login successful'); // Debug log
                } catch (error) {
                    showToast('Login failed. Please try again.', 'error');
                } finally {
                    loadingSpinner.remove();
                }
            }
        });
    }

    // Progress bar update
    const updateProgress = () => {
        document.querySelectorAll('.progress-bar-fill').forEach(bar => {
            const value = bar.getAttribute('data-value');
            bar.style.width = `${value}%`;
        });
    };

    // Navigation Handler
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Navigation clicked'); // Debug log
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            e.target.classList.add('active');
            
            // Show corresponding section
            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            targetSection.style.opacity = '0';
            document.getElementById(targetId).classList.add('active');
            targetSection.style.opacity = '1';
            targetSection.style.transition = 'opacity 0.3s ease-in-out';
        });
    });

    updateProgress();

    // Initialize charts after DOM loads
    const initCharts = () => {
        // Daily Usage Chart
        new Chart(document.getElementById('dailyUsageChart'), {
            type: 'bar',
            data: {
                labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
                datasets: [{
                    label: 'Water Usage (L)',
                    data: [1.2, 2.1, 1.5, 0.4],
                    backgroundColor: 'rgba(67, 97, 238, 0.5)'
                }]
            },
            options: {
                responsive: true
            }
        });

        // Similar configurations for weekly and monthly charts
    };

    initCharts();
});

// Check authentication
window.addEventListener('load', () => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }
});

// Navigation Handler
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        
        // Update active states
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        
        // Show correct section
        document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
    });
});

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
});