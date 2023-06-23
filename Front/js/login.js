function sentlogin(params) {
    user = document.getElementById('username').value;
    pass = document.getElementById('password').value;
    ajax = new XMLHttpRequest();
    ajax.open('POST', 'http://localhost:9100/login');
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send('user=' + user + '&pass=' + pass);
    ajax.onreadystatechange = function () {

        if (ajax.status == 500 && ajax.readyState == 4)
            alert('Server Error');

        if (ajax.status == 404 && ajax.readyState == 4)
            alert('Not Found');

        if (ajax.status == 401 && ajax.readyState == 4)
            alert(ajax.responseText);

        if (ajax.status == 200 && ajax.readyState == 4) {
            var usuario = JSON.parse(ajax.responseText);
            var token = usuario.token;
            localStorage.setItem('token', token);
            localStorage.setItem('userid', usuario.id.idUsuario);
            window.location.href = url + '/views/main.html';
        }
    }

}