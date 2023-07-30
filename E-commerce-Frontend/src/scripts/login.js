login =  () => {

    const login_btn = document.getElementById("login")
    login_btn.addEventListener ('click', async (e) => {
        e.preventDefault()

        const email = document.getElementById("email_in").value;
        const password = document.getElementById("password").value;

        let formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);

        fetch("http://127.0.0.1:8000/api/login", {
            method: 'POST',
            body: formdata,
            })
            .then(response => response.json())
            .then(data => {
                if(data.authorization.token){
                    localStorage.setItem('user_id', data.user.id)
                    localStorage.setItem('role', data.user.role_id)
                    window.location.href='/E-commerce-Frontend/src/pages/shop.html'
                }
            })
            .catch(error => console.log('error', error));

    })

}
login();