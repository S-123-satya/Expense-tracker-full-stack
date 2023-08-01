// const e = require("cors");

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

    const token = localStorage.getItem('token');
    if (token !== null) {
        axios.get(`${url}/expense`, config)
            .then(data => {
                console.log(data);
                if (data.data.length > 0)
                    data.data.forEach(element => {
                        display(element);
                    });
            })
            .catch(err => console.log(err));
    }
    const dashboardBtn = document.getElementById('dashboardBtn');
    const premiumStatus = localStorage.getItem('isPremium');
    console.log(premiumStatus);
    if (premiumStatus=="true") {
        const isPremium = document.getElementById('isPremium');
        console.log(typeof isPremium);
        isPremium.innerHTML = "<p>You are a premium user now</p>";
        dashboardBtn.className = 'btn btn-success'
    }
    if (token == undefined || token == '' || token == null) {
        alert("Yoe are not login, Please login first to add Expense");
        window.location = `${url}/login.html`;
    }
    else {
        const name = localStorage.getItem('userName')
        const userName = document.getElementById('userName');
        userName.innerHTML = `<h3 class=" bg-success m-1 p-3 rounded">${name.toUpperCase()}</h3>`
        const logout = document.getElementById('logout');
        logout.innerHTML = `<button type="button" id="logout" class="btn btn-outline-danger">Logout</button>`
    }

})

const logoutUser = () => {
    const logout = document.getElementById('logout');
    logout.addEventListener('click', () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
        localStorage.removeItem('isPremium');
        alert("You are successfully logout")
        location = `${url}/login.html`
    });
};
logoutUser();
const deleteExpense = (id) => {
    console.log(id);
    document.getElementById(`${id}`).remove();
    axios.delete(`${url}/expense/${id}`, config)
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

const handleOpenRazorpay = (data) => {
    console.log(data);
    let options = {
        key_id: "xyz",
        amount: 50000,
        currency: "INR",
        order_id: data.id,
        handler: function (response) {
            console.log(`handler`);
            console.log(response);
            axios.post(`${url}/premium`, response, config)
                .then((response => {
                    console.log(response);
                    alert("You are a Premium user now");
                    const isPremium = document.getElementById('isPremium');
                    console.log(isPremium);
                    isPremium.innerHTML = "<p>You are a premium user now</p>";
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('isPremium', response.is_premium)
                }))
        }
    }
    let rzy = new Razorpay(options);
    rzy.open();
}

const premium = document.getElementById('premiumBtn');
if (premium != null) {
    premium.addEventListener('click', (e) => {
        e.preventDefault();
        axios.get(`${url}/premium`, config)
            .then(response => {
                console.log(response);
                handleOpenRazorpay(response.data.order);
            })
            .catch(err => console.log(err));
    });
}
const addExpense = document.getElementById('addExpense');
addExpense.addEventListener('click', saveExpense);
const displayUsers=(data)=>{
    console.log(data);
    const listOfUses = document.getElementById('listOfUses');
    listOfUses.innerHTML+=`<li> ${data.name} : ${data.totalcost||0}`
    
}
dashboardBtn.addEventListener('click', async () => {
    try {
        const data =await axios.get(`${url}/premium/dashboard`,config);
        console.log(data.data.data);
        data.data.data.forEach(element=>displayUsers(element));
    }
    catch {

    }
});