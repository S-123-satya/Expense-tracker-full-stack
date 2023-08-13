const url = 'http://localhost:3000';

const getPassword = (e) => {
    console.log(e);
    console.log('hello');
    const email = document.getElementById('email');
    const obj = {
        email: email.value,
    }
    console.log(obj);
    axios.post(`${url}/password/forgotpassword`, obj)
        .then(res => {
            console.log(res);
            console.log(res.data);
            alert(res?.data?.message);
            if (res?.data?.status === 501) {
                email.value = '';
            }
            else
                window.location = `${url}/login.html`
        })
        .catch(err => console.log(err))
}
