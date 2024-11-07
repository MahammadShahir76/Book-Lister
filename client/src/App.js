import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Login from './components/Login';
import AddBook from './components/AddBook';
import Booklist from './components/Booklist';
import UpdateBook from './components/UpdateBook';
function App() {
  return (
    <div>
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path='/add' element={<AddBook/>}></Route>
      <Route path='/' element={<Booklist/>}></Route>
      <Route path='/update/:id' element={<UpdateBook/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    
    </BrowserRouter>
    </div>
    
  );
}

export default App;
