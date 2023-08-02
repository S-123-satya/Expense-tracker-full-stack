const url = 'http://localhost:3000';

const getPassword = (e) => {
    console.log(e);
    console.log('hello');
    const email = document.getElementById('email');
    const obj = {
        email: email.value,
    }
    console.log(obj);
    axios.post(`${url}/password/forgotpassword`,obj)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}