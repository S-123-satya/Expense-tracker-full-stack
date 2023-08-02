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

const postOtpPassword=(e)=>{
    console.log(`otp post`);
    const otp = document.getElementById('otp');
    const obj={
        otp:otp.value
    }
    axios.post(`${url}/password/forgotpassword/otp`,obj)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}