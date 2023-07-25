const url = 'http://localhost:3000';

// axios.defaults.headers.common['Authorization'] = localStorage.getItem('UserId');
const config={
    headers: {
      Authorization: `${localStorage.getItem('UserId')}` //the token is a variable which holds the token
    }
   }
const save = (e) => {
    // e.preventDefault();
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
        UserId:localStorage.getItem(`UserId`)
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

const display=(data)=>{
    console.log(data);
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML+=`<li id="`+`${data.id}`+`"> 
    ${data.expenseInput} ${data.descriptionInput} ${data.categoryInput}
    <button onclick="`+`delete('${data.id}')`+`">Delete</button>
    </li>`
    
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get(`${url}/expensedata`,config)
    .then(data=>{
        console.log(data);
        data.data.forEach(element => {
            display(element);
        });
    })
    .catch(err=>console.log(err));
})