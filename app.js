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
        initializeCharts(); // Initialize charts after login
        console.log('Initializing charts...'); // Debug log
        initializeDashboardCharts();
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

    initWaterAnalytics();

    // Initialize Mineral Content Chart
    const mineralChart = new Chart(document.getElementById('mineralChart'), {
        type: 'bar',
        data: {
            labels: ['Calcium', 'Magnesium', 'Sodium', 'Potassium'],
            datasets: [{
                label: 'Mineral Content (mg/L)',
                data: [40, 12, 8, 2],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.7)',
                    'rgba(72, 149, 239, 0.7)',
                    'rgba(63, 55, 201, 0.7)',
                    'rgba(67, 97, 238, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const initCharts = () => {
        // Usage Pattern Chart
        const usageCtx = document.getElementById('usagePatternChart');
        if (usageCtx) {
            new Chart(usageCtx, {
                type: 'line',
                data: {
                    labels: ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
                    datasets: [{
                        label: 'Water Usage (L)',
                        data: [0.2, 0.1, 1.8, 2.5, 1.2, 0.8, 1.5, 0.9],
                        fill: true,
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        borderColor: 'rgba(67, 97, 238, 0.8)',
                        tension: 0.4,
                        pointBackgroundColor: 'rgba(67, 97, 238, 1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    };

    // Load Chart.js and initialize
    const loadChartJs = () => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = initCharts;
        document.head.appendChild(script);
    };

    loadChartJs();
});

function initWaterAnalytics() {
    // TDS Update
    setInterval(() => {
        const tdsValue = Math.floor(Math.random() * (150 - 90) + 90);
        document.querySelector('.tds-value').textContent = `${tdsValue} PPM`;
    }, 5000);

    // pH Update
    setInterval(() => {
        const phValue = (Math.random() * (7.8 - 6.8) + 6.8).toFixed(1);
        document.querySelector('.ph-value').textContent = phValue;
    }, 5000);
}

// Water Usage Alert
document.getElementById('filterSchedule').addEventListener('change', (e) => {
    const mode = e.target.value;
    if (mode === 'auto') {
        showNotification('Auto cleaning mode enabled');
    }
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function initializeCharts() {
    // Usage Pattern Chart
    const usageCtx = document.getElementById('usagePatternChart');
    if (usageCtx) {
        new Chart(usageCtx, {
            type: 'line',
            data: {
                labels: ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
                datasets: [{
                    label: 'Water Usage (L)',
                    data: [0.2, 0.1, 1.8, 2.5, 1.2, 0.8, 1.5, 0.9],
                    fill: true,
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderColor: 'rgba(67, 97, 238, 0.8)',
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(67, 97, 238, 1)',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Mineral Content Chart
    const mineralCtx = document.getElementById('mineralChart');
    if (mineralCtx) {
        new Chart(mineralCtx, {
            type: 'bar',
            data: {
                labels: ['Calcium', 'Magnesium', 'Sodium', 'Potassium'],
                datasets: [{
                    label: 'Mineral Content (mg/L)',
                    data: [40, 12, 8, 2],
                    backgroundColor: [
                        'rgba(67, 97, 238, 0.7)',
                        'rgba(72, 149, 239, 0.7)',
                        'rgba(63, 55, 201, 0.7)',
                        'rgba(67, 97, 238, 0.7)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
}

function initializeDashboardCharts() {
    console.log('Charts initialization started'); // Debug log
    
    // Weekly Trend Chart
    const weeklyCtx = document.getElementById('weeklyTrendChart');
    if (weeklyCtx) {
        console.log('Weekly chart context found'); // Debug log
        new Chart(weeklyCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Usage (L)',
                    data: [35, 42, 38, 45, 32, 48, 40],
                    fill: true,
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderColor: 'rgba(67, 97, 238, 0.8)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Quality Chart
    const qualityCtx = document.getElementById('qualityChart');
    if (qualityCtx) {
        console.log('Quality chart context found'); // Debug log
        new Chart(qualityCtx, {
            type: 'radar',
            data: {
                labels: ['TDS', 'pH Level', 'Chlorine', 'Hardness', 'Turbidity'],
                datasets: [{
                    data: [90, 85, 95, 88, 92],
                    backgroundColor: 'rgba(67, 97, 238, 0.2)',
                    borderColor: 'rgba(67, 97, 238, 0.8)',
                    pointBackgroundColor: 'rgba(67, 97, 238, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}