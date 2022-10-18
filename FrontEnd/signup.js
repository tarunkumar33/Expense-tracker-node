const axiosObj=axios.create({
    baseURL:'http://localhost:3000'
});

const signupFormArea=document.querySelector('.signupForm');

//EventListeners
signupFormArea.addEventListener('submit',signupHandler);

async function signupHandler(e){
    try{
        e.preventDefault();
        userDetails={
            name:e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value
        }
        console.log(userDetails);
        const res=await axiosObj.post('/user/signup',userDetails);
        if(res.data.errors){
            throw new Error("User already exists");
        }
        else{
            window.location.href='./login.html';
        }
    }
    catch(err){
        document.body.innerHTML+=`<div style="color:red;">${err}</div>`
    }
}