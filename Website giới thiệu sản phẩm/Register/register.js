document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.email === email);
    const usernameExists = users.some(user => user.username === username);

    if (userExists) {
        alert('Email đã được sử dụng');
        return;
    }

    if (usernameExists) {
        alert('Tên người dùng đã tồn tại');
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Đăng ký thành công');
    window.location.href = '../Login/login.html';
});
