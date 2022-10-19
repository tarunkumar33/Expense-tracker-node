const axiosObj=axios.create({
    baseURL:'http://localhost:3000'
});

const expenseFormArea=document.getElementById('expenseForm');
const expensesListArea=document.getElementById('expensesList');

window.addEventListener("DOMContentLoaded",getExpenses);
expenseFormArea.addEventListener('submit',expenseHandler);
expensesListArea.addEventListener('click',expensesListAreaHandler);

async function expensesListAreaHandler(e){
    try{
        e.preventDefault();
        console.log('preventDefault:');
        if(e.target.classList.contains('delete')){
            const token=localStorage.getItem('token');
            const res=await axiosObj.delete(`/user/deleteExpense/${e.target.parentElement.id}`,{headers:{Authorization:token}});
            console.log('res:', res)
            getExpenses();
        }
        
    }
    catch(err){
        console.log(err);
        document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}</div>`;
    }
}
async function getExpenses(){
    try{
        const token=localStorage.getItem('token');
        const res=await axiosObj.get('/user/getExpenses',{headers:{Authorization:token}}); 
        console.log(res);  
        expensesListArea.innerHTML='';
        res.data.forEach((expense)=>addNewExpenseToUI(expense));
    }
    catch(err){
        console.log(err);
        document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}</div>`;
    }
}

function addNewExpenseToUI({id,expenseAmount,description,category}){
    expensesListArea.innerHTML+=`<li class="list-group-item" id=${id}>
    ${expenseAmount}-${description}-${category}
    <button class="btn btn-danger btn-sm float-right delete">X</button>
    </li>`;
}

async function expenseHandler(e){
    try{
        e.preventDefault();
        const token=localStorage.getItem('token');
        const res=await axiosObj.post('/user/addExpense',{
            expenseAmount:e.target.expenseAmount.value,
            description:e.target.description.value,
            category:e.target.category.value
        },
        {headers:{Authorization:token}});
        console.log(res);
        getExpenses();
    }
    catch(err){
        console.log(err);
        document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}</div>`;
    }
}