const url='';

const save=(e)=>{
    // e.preventDefault();
    console.log(e);
    console.log('hello');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const obj={
        name:name.value,
        email:email.value,
        password:password.value
    }
    axios.post(url,obj)
    .then(data=>{
    console.log(data)
    ''})
    .catch(err=>console.log(err));
    
    
}