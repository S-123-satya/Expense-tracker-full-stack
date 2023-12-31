const url = "http://localhost:3000";
const selectOffset = document.getElementById("offsetInput");
console.log(selectOffset);
selectOffset.addEventListener("change", (e) => {
  // e.target.value
  console.log(e);
  console.log(e.target.value);
  localStorage.setItem("offset", e.target.value);
  const token = localStorage.getItem("token");
  if (token !== null) {
    axios
      .get(`${url}/expense?page=1&&offset=${e.target.value}`, config)
      .then((data) => {
        console.log(data);
        console.log(`96`);
        console.log(data.data);
        pagination(data.data);
      })
      .catch((err) => console.log(err));
  }
});
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('UserId');
const config = {
  headers: {
    Authorization: `${localStorage.getItem("token")}`, //the token is a variable which holds the token
  },
};

const display = (data) => {
  console.log(data);
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML +=
    `<li id="` +
    `${data._id}` +
    `"> 
    ${data.expenseInput} ${data.descriptionInput} ${data.categoryInput}
    <button onclick="` +
    `deleteExpense('${data._id}')` +
    `">Delete</button>
    </li>`;
};
const prevPage = (num) => {
  let offset = localStorage.getItem("offset");
  axios
    .get(`${url}/expense?page=${num}&&offset=${offset}`, config)
    .then((data) => {
      console.log(data.data);
      pagination(data.data);
    })
    .catch((err) => {
      console.log(err);
      console.log(`error in something`);
    });
};
const nextPage = (num) => {
  let offset = localStorage.getItem("offset");
  axios
    .get(`${url}/expense?page=${num}&&offset=${offset}`, config)
    .then((data) => {
      console.log(data.data);
      pagination(data.data);
    })
    .catch((err) => {
      console.log(err);
      console.log(`error in something`);
    });
};
const pagination = (data) => {
  console.log(`76`);
  console.log(data);
  console.log(data.hasNextPage);
  console.log(typeof data.hasNextPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";
  if (data.hasPrevPage === true) {
    pagination.innerHTML += `<button id="prevPage" onclick="prevPage(${data.prevPage})">${data.prevPage}</button>`;
  }
  pagination.innerHTML += `<button id="currentPage">${data.currentPage}</button>`;
  if (data.hasNextPage === true) {
    pagination.innerHTML += `<button id="nextPage" onclick="nextPage(${data.nextPage})" value="${data.nextPage}">${data.nextPage}</button>`;
  }
  if (data.result.length > 0)
    data.result.forEach((element) => {
      display(element);
    });
};
window.addEventListener("DOMContentLoaded", () => {
  let offset = localStorage.getItem("offset");
  const token = localStorage.getItem("token");
  if (token !== null) {
    axios
      .get(`${url}/expense?page=1&&offset=${offset}`, config)
      .then((data) => {
        console.log(data);
        console.log(`96`);
        console.log(data.data);
        pagination(data.data);
      })
      .catch((err) => console.log(err));
  }
  const dashboardBtn = document.getElementById("dashboardBtn");
  const premiumStatus = localStorage.getItem("isPremium");
  console.log(premiumStatus);
  if (premiumStatus == "true") {
    const isPremium = document.getElementById("isPremium");
    console.log(typeof isPremium);
    isPremium.innerHTML = "<p>You are a premium user now</p>";
    dashboardBtn.className = "btn btn-success";
    const dailyExpenseBtn = document.getElementById("dailyExpenseBtn");
    const monthlyExpenseBtn = document.getElementById("monthlyExpenseBtn");
    const yearlyExpenseBtn = document.getElementById("yearlyExpenseBtn");
    dailyExpenseBtn.className = "btn btn-success";
    monthlyExpenseBtn.className = "btn btn-success";
    yearlyExpenseBtn.className = "btn btn-success";
  }
  if (token == undefined || token == "" || token == null) {
    alert("Yoe are not login, Please login first to add Expense");
    window.location = `${url}/login.html`;
  } else {
    const name = localStorage.getItem("userName");
    const userName = document.getElementById("userName");
    userName.innerHTML = `<h3 class=" bg-success m-1 p-3 rounded">${name.toUpperCase()}</h3>`;
    const logout = document.getElementById("logout");
    logout.innerHTML = `<button type="button" id="logout" class="btn btn-outline-danger">Logout</button>`;
  }
});

const saveExpense = (e) => {
  e.preventDefault();
  console.log(e);
  console.log(Object.keys(localStorage)[0]);
  console.log("hello");
  const expenseInput = document.getElementById("expenseInput");
  const descriptionInput = document.getElementById("descriptionInput");
  const categoryInput = document.getElementById("categoryInput");
  const obj = {
    expenseInput: expenseInput.value,
    descriptionInput: descriptionInput.value,
    categoryInput: categoryInput.value,
  };
  console.log(obj);

  axios
    .post(`${url}/expense`, obj, config)
    .then((data) => {
      console.log(data);
      const result = data.data.data;
      // creating new li node
      const expenseList = document.getElementById("expenseList");
      const newNode = document.createElement("li");
      newNode.innerHTML =
        ` ${result.expenseInput} ${result.descriptionInput} ${result.categoryInput}
                <button onclick="` +
        `deleteExpense('${result._id}')` +
        `">Delete</button>`;
      newNode._id = `${result._id}`;
      // inserting as a first child in expenseList
      expenseList.insertBefore(newNode, expenseList.children[0]);
    })
    .catch((err) => console.log(err));
  expenseInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
};

const logoutUser = () => {
  const logout = document.getElementById("logout");
  logout.addEventListener("click", () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("isPremium");
    alert("You are successfully logout");
    location = `${url}/login.html`;
  });
};
logoutUser();
const deleteExpense = (id) => {
  console.log(id);
  document.getElementById(`${id}`).remove();
  axios
    .delete(`${url}/expense/${id}`, config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const handleOpenRazorpay = (data) => {
  console.log(data);
  var options = {
    key: "rzp_test_in3Fs0i7jti3P8", // Enter the Key ID generated from the Dashboard
    amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Satya expense Transaction",
    description: "Premium Transaction",
    image: "https://example.com/your_logo",
    order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
      axios.post(`${url}/premium`, response, config).then((response) => {
        console.log(response);
        alert("You are a Premium user now");
        const isPremium = document.getElementById("isPremium");
        console.log(isPremium);
        isPremium.innerHTML = "<p>You are a premium user now</p>";
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isPremium", response.data.is_premium);
      });
    },
    prefill: {
      name: "Satyaprakash Yadav",
      email: "satya@gmail.com",
      contact: "9000090000",
    },
    notes: {
      address: "Satya Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp1 = new Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
  rzp1.open();
};

const premium = document.getElementById("premiumBtn");
if (premium != null) {
  premium.addEventListener("click", (e) => {
    e.preventDefault();
    axios
      .get(`${url}/premium`, config)
      .then((response) => {
        console.log(response);
        handleOpenRazorpay(response.data.order);
      })
      .catch((err) => console.log(err));
  });
}
const addExpense = document.getElementById("addExpense");
addExpense.addEventListener("click", saveExpense);
const displayUsers = (data) => {
  console.log(data);
  const listOfUses = document.getElementById("listOfUses");
  listOfUses.innerHTML += `<li> ${data.name} : ${data.total_expenses || 0}`;
};
dashboardBtn.addEventListener("click", async () => {
  try {
    const data = await axios.get(`${url}/premium/dashboard`, config);
    console.log(data.data.data);
    document.getElementById("listOfUses").innerHTML = "";
    data.data.data.forEach((element) => displayUsers(element));
  } catch {}
});
dailyExpenseBtn.addEventListener("click", async () => {
  try {
    const data = await axios.get(`${url}/premium/dailyExpense`, config);
    console.log(data.data.data);
    document.getElementById("listOfUses").innerHTML = "";
    data.data.data.forEach((element) => displayUsers(element));
  } catch {}
});
monthlyExpenseBtn.addEventListener("click", async () => {
  try {
    const data = await axios.get(`${url}/premium/monthlyExpense`, config);
    console.log(data.data.data);
    document.getElementById("listOfUses").innerHTML = "";
    data.data.data.forEach((element) => displayUsers(element));
  } catch {}
});
yearlyExpenseBtn.addEventListener("click", async () => {
  try {
    const data = await axios.get(`${url}/premium/yearlyExpense`, config);
    console.log(data.data.data);
    document.getElementById("listOfUses").innerHTML = "";
    data.data.data.forEach((element) => displayUsers(element));
  } catch {}
});

function download() {
  axios
    .get(`${url}/user/download`, config)
    .then((response) => {
      if (response.status === 201) {
        //the bcakend is essentially sending a download link
        //  which if we open in browser, the file would download
        var a = document.createElement("a");
        a.href = response.data.fileUrl;
        a.download = "myexpense.csv";
        a.click();
      } else {
        throw new Error(response.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
