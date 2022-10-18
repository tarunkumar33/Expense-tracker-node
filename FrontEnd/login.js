const axiosObj=axios.create({
    baseURL:'http://localhost:3000'
});

const loginFormArea=document.querySelector('.loginForm');

loginFormArea.addEventListener('submit',loginHandler);

async function loginHandler(e){
    try{
        e.preventDefault();
        const res=await axiosObj.post('/user/login',{
            email:e.target.email.value,
            password:e.target.password.value
        });
        console.log(res);
        alert(res.data.message);
    }
    catch(err){
        console.log(err);
        document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}</div>`;
    }
}