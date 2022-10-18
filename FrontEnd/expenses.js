const axiosObj=axios.create({
    baseURL:'http://localhost:3000'
});

const expenseFormArea=document.getElementById('expenseForm');

expenseFormArea.addEventListener('submit',expenseHandler);

async function expenseHandler(e){
    try{
        e.preventDefault();
        const res=await axiosObj.post('/user/addExpense',{
            expenseAmount:e.target.expenseAmount.value,
            description:e.target.description.value,
            category:e.target.category.value
        });
        console.log(res);
    }
    catch(err){
        console.log(err);
        document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}</div>`;
    }
}