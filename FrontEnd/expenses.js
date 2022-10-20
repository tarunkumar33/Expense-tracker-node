const axiosObj = axios.create({
    baseURL: 'http://localhost:3000'
});

const token = localStorage.getItem('token');
const expenseFormArea = document.getElementById('expenseForm');
const expensesListArea = document.getElementById('expensesList');

window.addEventListener("DOMContentLoaded", getExpenses);
expenseFormArea.addEventListener('submit', expenseHandler);
expensesListArea.addEventListener('click', expensesListAreaHandler);

async function expensesListAreaHandler(e) {
    try {
        e.preventDefault();
        console.log('preventDefault:');
        if (e.target.classList.contains('delete')) {
            const token = localStorage.getItem('token');
            const res = await axiosObj.delete(`/user/deleteExpense/${e.target.parentElement.id}`, { headers: { Authorization: token } });
            console.log('res:', res)
            getExpenses();
        }

    }
    catch (err) {
        console.log(err);
        document.body.innerHTML += `<div style="color:red;">${err.response.data.message}</div>`;
    }
}
async function getExpenses() {
    try {
        const token = localStorage.getItem('token');
        const res = await axiosObj.get('/user/getExpenses', { headers: { Authorization: token } });
        console.log(res);
        expensesListArea.innerHTML = '';
        res.data.forEach((expense) => addNewExpenseToUI(expense));
    }
    catch (err) {
        console.log(err);
        document.body.innerHTML += `<div style="color:red;">${err.response.data.message}</div>`;
    }
}

function addNewExpenseToUI({ id, expenseAmount, description, category }) {
    expensesListArea.innerHTML += `<li class="list-group-item" id=${id}>
    ${expenseAmount}-${description}-${category}
    <button class="btn btn-danger btn-sm float-right delete">X</button>
    </li>`;
}

async function expenseHandler(e) {
    try {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await axiosObj.post('/user/addExpense', {
            expenseAmount: e.target.expenseAmount.value,
            description: e.target.description.value,
            category: e.target.category.value
        },
            { headers: { Authorization: token } });
        console.log(res);
        getExpenses();
    }
    catch (err) {
        console.log(err);
        document.body.innerHTML += `<div style="color:red;">${err.response.data.message}</div>`;
    }
}

document.getElementById('rzp-button1').onclick = async function (e) {
    const response = await axiosObj.get('/purchase/premiummembership', { headers: { "Authorization": token } });
    console.log(response);
    var options =
    {
        "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
        "name": "Test Company",
        "order_id": response.data.order.id, // For one time payment
        "prefill": {
            "name": "Test User",
            "email": "test.user@example.com",
            "contact": "1234567891"
        },
        "theme": {
            "color": "#3399cc"
        },
        // This handler function will handle the success payment
        "handler": function (response) {
            console.log(response);
            axiosObj.post('/purchase/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: { "Authorization": token } }).then(() => {
                alert('You are a Premium User Now')
            }).catch(() => {
                alert('Something went wrong. Try Again!!!')
            })
        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
}