import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const UpdateBook = () => {

    const[name,setname]=useState('');
    const[author,setauthor]=useState('');
    const[description,setdescription]=useState('');
    const[image,setimage]=useState('')
    const[price,setprice]=useState('')
    
    const params=useParams()
    const navigate=useNavigate();

    useEffect(()=>{
      getBookDetails();
    },[])

    const getBookDetails=async()=>{
        let result=await fetch(`http://localhost:5000/book/${params.id}`)
       result=await result.json();
       setname(result.name);
       setauthor(result.author);
       setdescription(result.description);
       setimage(result.image);
       setprice(result.price);
    }
    const updateboook=async()=>{
      let result=await fetch(`http://localhost:5000/book/${params.id}`,{
        method:'put',
        body:JSON.stringify({name,author,description,image,price}),
        headers:{
          'Content-type':"application/json"
        }
      })
      result=await result.json();
      navigate("/")
    }
  return (
    <div>
      <h1>Update book page</h1>
      <input type='text' placeholder='Enter name' onChange={(e)=>setname(e.target.value)} value={name}/>

      <input type='text' placeholder='Enter author' onChange={(e)=>setauthor(e.target.value)} value={author}/>

      <input type='text' placeholder='Enter book description' onChange={(e)=>setdescription(e.target.value)} value={description}/>

      <input type='text' placeholder='Enter book image' onChange={(e)=>setimage(e.target.value)} value={image}/>

      <input type='text' placeholder='Enter book price' onChange={(e)=>setprice(e.target.value)} value={price}/>

    <button onClick={updateboook}>Update Book</button>
    </div> 
  )
}

export default UpdateBook
