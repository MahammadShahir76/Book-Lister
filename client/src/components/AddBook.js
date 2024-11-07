import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
const AddBook = () => {
    const [name,setname]=useState('')
    const [author,setauthor]=useState('')
    const [description,setdescription]=useState('')
    const [image,setimage]=useState('')
    const [price,setprice]=useState('')
    const [Error,setError]=useState(false)
    
    //add image details
    const [imagee, setImagee] = useState(null);
    const [allImage, setAllImage] = useState(null);
  
 
    const submitImage = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("image", imagee);
  
      const result = await axios.post(
        "http://localhost:5000/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    };
  
    const onInputChange = (e) => {
      console.log(e.target.files[0]);
      setImagee(e.target.files[0]);
    };
  

    ///till here to add image details
    
    const navigate=useNavigate();


    const addbook=async()=>{
        if(!name||!author||!description||!image){
            setError(true)
            return false;
        }
        const userId=JSON.parse(localStorage.getItem("User"))._id;

        let result=await fetch("http://localhost:5000/add-book",{
        method:"post",
        body:JSON.stringify({name,author,description,image,price,userId}),
        headers:{"Content-type":"application/json"}
        })
        result=await result.json();
        navigate("/")
    }
  return (
    <div>
      <h1>Add book page</h1>
      <input type='text' placeholder='Enter book name' onChange={(e)=>setname(e.target.value)} value={name}/>
      {Error&&!name&&<span>Enter valid name</span>}

      <input type='text' placeholder='Enter author name' onChange={(e)=>setauthor(e.target.value)} value={author}/>
      {Error&&!author&&<span>Enter valid author</span>}

      <input type='text' placeholder='Enter book description' onChange={(e)=>setdescription(e.target.value)} value={description}/>
      {Error&&!description&&<span>Enter valid description</span>}

      <input type='text' placeholder='Enter book image' onChange={(e)=>setimage(e.target.value)} value={image}/>
      {Error&&!image&&<span>Enter valid image</span>}  

      <input type='number' placeholder='Enter book price' onChange={(e)=>setprice(e.target.value)} value={price}/>
      {Error&&!price&&<span>Enter valid price</span>}

{/**add image details */}

<form onSubmit={submitImage}>
        <input type="file" accept="image/*" onChange={onInputChange}></input>
        <button type="submit">Submit</button>
      </form>
      
      {/**till here */}
      <button type='button' onClick={addbook}>Add Book</button>
    </div>
  )
}

export default AddBook



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

