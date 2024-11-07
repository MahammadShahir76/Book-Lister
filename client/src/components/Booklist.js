import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Booklist = () => {
  const [books, setBooks] = useState([]);
  const [allImage, setAllImage] = useState([]); // Store all images from the database

  useEffect(() => {
    getBooks();
    getImage();
  }, []);

  const getBooks = async () => {
    let result = await fetch('http://localhost:5000/books');
    result = await result.json();
    setBooks(result);
  };

  const deleteBook = async (id) => {
    let result = await fetch(`http://localhost:5000/book/${id}`, {
      method: 'delete'
    });
    result = await result.json();
    if (result) {
      getBooks();
    }
  };

  // Fetch image details
  const getImage = async () => {
    const result = await axios.get('http://localhost:5000/get-image');
    setAllImage(result.data.data);
  };

  return (
    <div>
      <h1>Book list</h1>
      {books.length > 0 ? (
        books.map((item, index) => (
          <div key={item._id}>
            {/* Display corresponding image from allImage array */}
            {allImage[index] && (
              <img
                src={require(`../images/${allImage[index].image}`)}
                alt="Book"
                height={100}
                width={100}
              />
            )}
            <h3>{item.name}</h3>
            <h4>{item.author}</h4>
            <p>{item.description}</p>
            <h4>{item.price}</h4>

            <Link to={'update/' + item._id}>Update</Link>
            <button onClick={() => deleteBook(item._id)}>Delete</button>
          </div>
        ))
      ) : (
        <h1>No Books Found</h1>
      )}
    </div>
  );
};

export default Booklist;































////////////////////////////////////////////////////////////////////////////////

//bina photo upload kiya hua code hai neeche

// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from "axios";
// const Booklist = () => {
//     const[books,setbooks]=useState([])
//     const [allImage, setAllImage] = useState(null);//add image details

//     useEffect(()=>{
//         getBooks();
//         getImage();
//     },[])
//     const getBooks=async()=>{
//         let result=await fetch('http://localhost:5000/books')
//         result=await result.json()
//         setbooks(result)
//     }

//     const deleteBook=async(id)=>{
//       let result=await fetch(http://localhost:5000/book/${id},{
//         method:"delete"
//       });
//       result=await result.json();
//       if(result){
//         getBooks()
//       }
//     }

//     //add image details
//     const getImage = async () => {
//       const result = await axios.get("http://localhost:5000/get-image");
//       console.log(result);
//       setAllImage(result.data.data);
//     };
//   return (
//     <div>
//       <h1>Book list</h1>
//         {
//             books.length>0?books.map((items)=>
//     <div >
//             <img src={items.image}/>
//             <h3>{items.name}</h3>
//             <h4>{items.author}</h4>
//             <p>{items.description}</p>
//             <h4>{items.price}</h4>
//             <Link to={"update/"+items._id}>Update</Link>

//             <button onClick={()=>deleteBook(items._id)}>Delete</button>
//   </div>

//     ):<h1>No Books Found</h1>
    
//     }
//   </div>
        
//   )
// } 