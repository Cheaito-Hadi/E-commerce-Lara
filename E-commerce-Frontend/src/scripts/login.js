login = () => {

    const login_btn = document.getElementById("login")
    login_btn.addEventListener('click', (e) => {
        e.preventDefault()

        const email = document.getElementById("email_in").value;
        const password = document.getElementById("password").value;

        formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);
        
        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/login", requestOptions)
            .then(response => response.json())
            .then(result => alert(result))
            .catch(error => alert('error', error));

    })

}
login();