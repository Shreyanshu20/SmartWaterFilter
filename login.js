document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const credentials = {
        username: document.getElementById('username').value,
        password: document.getElementById('userPassword').value,
        wifiName: document.getElementById('wifiName').value,
        wifiPassword: document.getElementById('wifiPassword').value
    };

    // Simulate authentication
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(credentials));
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
});

// Check if already logged in
window.addEventListener('load', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
    }
});