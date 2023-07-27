const url = 'http://localhost:3000';

const save = (e) => {
    // e.preventDefault();
    console.log(e);
    console.log('hello');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const obj = {
        name: name.value,
        email: email.value,
        password: password.value
    }
    console.log(obj);

    axios.post(`${url}/signup`, obj)
        .then(data => {
            console.log(data);
            if (data.data.name == 'SequelizeUniqueConstraintError') {
                console.log('duplicate');
                const showResult = document.getElementById('showResult');
                showResult.innerHTML = 'User Already exist';
            }
            else{
                // e.redirect('login.html')
                alert(data.data.message);
                localStorage.setItem("token",data.data.token)
                localStorage.setItem("userName",data.data.name)
                const userName = document.getElementById('userName');
                userName.innerHTML=`<button class="btn btn-success">${data.data.result.name}</button>`
            }
        })
        .catch(err => console.log(err));
    name.value = '';
    email.value = '';
    password.value = '';

}
const login = (e) => {
    // e.preventDefault();
    console.log(e);
    console.log('login');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const obj = {
        email: email.value,
        password: password.value
    }
    console.log(obj);

    axios.post(`${url}/login`, obj)
        .then(data => {
            console.log(`data` + data.data);
            console.log(data.data);
            localStorage.setItem(`userName`, `${data.data.name}`)
            localStorage.setItem(`token`, `${data.data.token}`)
            if (data.data.email == obj.email) {
                const showResult = document.getElementById('showResult');
                showResult.innerHTML = 'User login successfully';
                alert('user login successful')
                const userName = document.getElementById('userName');
                userName.innerHTML=`<button class="btn btn-success">${data.data.name}</button>`
            }
        })
        .catch(err => {
            console.log(err);
            const showResult = document.getElementById('showResult');
            showResult.innerHTML = err.response.data.name;
        });
    email.value = '';
    password.value = '';

}