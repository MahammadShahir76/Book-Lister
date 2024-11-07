import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
const Signup = () => {
    const[name,setname]=useState("")
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")

    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('User')
        if(auth){
            navigate("/")
        }
    })

    const collection=async ()=>{
        let result =await fetch("http://localhost:5000/register",{
            method:"post",
            body:JSON.stringify({name,email,password}),
            headers:{
                "Content-Type":"application/json",
            },
    });
    result=await result.json();
    console.log(result);
    localStorage.setItem("User",JSON.stringify(result));
    if(result){
        navigate("/")
    }
}

    
  return (
    <div>
      <div>
        <h1>Signup page</h1>
        <input type='text' placeholder='enter name' onChange={(e)=>setname(e.target.value)} value={name}/>
        <input type='text' placeholder='enter email' onChange={(e)=>setemail(e.target.value)} value={email}/>
        <input type='password' placeholder='enter password' onChange={(e)=>setpassword(e.target.value)} value={password}/>
        <button type='button' onClick={collection}>Submit</button>
      </div>
    </div>
  )
}

export default Signup
