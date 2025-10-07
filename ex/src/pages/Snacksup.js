import React from 'react'
import { ToastContainer ,toast } from 'react-toastify';
// import { useEffect } from 'react';
const Snacksup = () => {
    const handleSubmit=(event)=>{
        event.preventDefault();
        const form=event.target;
        const name=form.fname.value
        const email=form.email.value
        const pass=form.pass.value
        if(name==="" || email==="" ||pass==="")
        {
            toast.warn('fill Required ');
        }else{
            const userdata={name,email,pass};
            // console.log(foods,"foods in object ");
            
            fetch('http://localhost:7001/upload',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(userdata),
            })
            // .then((res)=>res.json())
            .then((data)=>{
                toast.success('added successfully');
                form.reset();
                window.location.href="/reg"
            }
            )
        }
        }
return (
    <div>
                <ToastContainer/>
              <div class="card upload6">
         <div class="card-body upload5">
            <form onSubmit={handleSubmit} >
            <h2>UPLOAD</h2>
            <div class="upload0" >
                <label><b>Name</b></label>
                <input type="text" name="fname" className='ms-3'/>
            </div>
            <div class="upload1">
                <label ><b>Email</b></label>
                <input type='email' name="email" className='ms-3'/>
                </div>
                <div class="upload2">
                <label ><b>Password</b></label>
                <input type='password' name="pass" className='ms-3'/>
                </div>
             
            <div class="upload7">
                <button type="submit" class="btn btn-primary">upload</button>
                
            </div>
        </form>
        </div>
        </div>
    </div>
       )
}
export default Snacksup;

