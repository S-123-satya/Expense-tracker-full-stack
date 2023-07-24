const url = 'http://localhost:3000/';

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

    axios.post(url, obj)
        .then(data => {
            console.log(data);
            if (data.data.name == 'SequelizeUniqueConstraintError')
                console.log('duplicate');
            const showResult = document.getElementById('showResult');
            showResult.innerHTML='User Already exist'
        })
        .catch(err => console.log(err));
    name.value = '';
    email.value = '';
    password.value = '';

}