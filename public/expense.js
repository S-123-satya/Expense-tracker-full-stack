const url = 'http://localhost:3000';

// axios.defaults.headers.common['Authorization'] = localStorage.getItem('UserId');
const config = {
    headers: {
        Authorization: `${localStorage.getItem('token')}` //the token is a variable which holds the token
    }
}
const saveExpense = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(Object.keys(localStorage)[0]);
    console.log('hello');
    const expenseInput = document.getElementById('expenseInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const categoryInput = document.getElementById('categoryInput');
    const obj = {
        expenseInput: expenseInput.value,
        descriptionInput: descriptionInput.value,
        categoryInput: categoryInput.value,
        token: localStorage.getItem(`token`)
    }
    console.log(obj);

    axios.post(`${url}/expense`, obj)
        .then(data => {
            console.log(data);
            display(data.data);
        })
        .catch(err => console.log(err));
    expenseInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';

}

const display = (data) => {
    console.log(data);
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML += `<li id="` + `${data.id}` + `"> 
    ${data.expenseInput} ${data.descriptionInput} ${data.categoryInput}
    <button onclick="`+ `deleteExpense('${data.id}')` + `">Delete</button>
    </li>`

}

window.addEventListener('DOMContentLoaded', () => {
    axios.get(`${url}/expense`, config)
        .then(data => {
            console.log(data);
            const userLogin = "Login"
            const userName = document.getElementById('userName');
            userName.innerHTML = `<button class="btn btn-success">${data.data.name ? data.data.name : userLogin}</button>`

            data.data.forEach(element => {
                display(element);
            });
        })
        .catch(err => console.log(err));
})

const deleteExpense=(id) => {
    console.log(id);
    document.getElementById(`${id}`).remove();
    axios.delete(`${url}/expense/${id}`,config)
    .then(res=>console.log(res))
    .catch(err=>console.log(err));
}

const handleOpenRazorpay=(data)=>{
    console.log(data);
    let options={
        key_id:"xyz",
        amount:50000,
        currency:"INR",
        order_id:data.id,
        handler:function (response){
            console.log(`handler`);
            console.log(response);
        }
    }
    let rzy= new Razorpay(options);
    rzy.open();
}

const premium=document.getElementById('premiumBtn');
premium.addEventListener('click',(e)=>{
    e.preventDefault();
    axios.get(`${url}/premium`,config)
    .then(response=>{
        console.log(response);
        handleOpenRazorpay(response.data.order);
    })
    .catch(err=>console.log(err));
});
