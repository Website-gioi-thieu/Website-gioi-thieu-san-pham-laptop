document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Đăng nhập thành công');
        window.location.href = '../admin/admin.html';
    } else {
        alert('Email hoặc mật khẩu không đúng');
    }
});
