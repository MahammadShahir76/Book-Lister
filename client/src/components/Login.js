import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")

    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem("User");
        if(auth){
            navigate("/")
        }
    },[])

    const handlelogin=async()=>{
        let result=await fetch("http://localhost:5000/login",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json",
            },
        })
        result=await result.json();
        if(result.name){
            localStorage.setItem("User",JSON.stringify(result))
            navigate("/")
        }else{
            alert("enter Correct details")
        }
    }

  return (
    <div>
      <h1>login page</h1>
      <input type='text' placeholder='Enter email' onChange={(e)=>setemail(e.target.value)} value={email}/>
      <input type='password' placeholder='Enter Password' onChange={(e)=>setpassword(e.target.value)} value={password}/>
      <button type='button' onClick={handlelogin}>Login</button>
    </div>
  )
}

export default Login
