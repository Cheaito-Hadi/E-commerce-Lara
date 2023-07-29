register = () =>
{
    const register_btn = document.getElementById("register-btn")
    register_btn.addEventListener('click', (e) => {
        e.preventDefault()

        let first_name = document.getElementById("first-name").value;
        let last_name = document.getElementById("last-name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        
        let formdata = new FormData();
        formdata.append("first_name", first_name);
        formdata.append("last_name", last_name);
        formdata.append("email", email);
        formdata.append("password", password);
        
        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/register", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    })
}

register();