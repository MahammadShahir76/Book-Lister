import React from 'react'
import {Link,useNavigate, useParams} from 'react-router-dom'
const Nav = () => {
    const auth=localStorage.getItem('User');

      
    
    const logee=()=>{
        localStorage.clear()
        navigate('/signup')
    }
const params=useParams();
  return (
    <div>
      {
        auth?
         <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add Book</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link onClick={logee} to="/signup">Logout</Link></li>
         </ul>
         :
         <ul>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li>
         </ul>
      }
    </div>
  )
}

export default Nav
