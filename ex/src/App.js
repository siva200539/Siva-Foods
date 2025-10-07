import Nav from './components/Nav.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Layout/Home.js';
import Menu from './Layout/Menu.js';
import Bottom from './components/Bottom.js';
import  Cart from './Layout/Cart.js';
import  Famous  from './components/Famous.js';
import Registering from './Layout/Registering.js';
import Snacksup from './pages/Snacksup.js';
import Gupload from './pages/Gupload.js';
import Edit from './pages/Edit.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
function App() {
  return (
    <BrowserRouter>
    <Nav/>
    {/* <Home/> 
    <Menu/> */}
    <Routes>
    
      <Route path='/' element={<Home/>} />  
      <Route path='/menu' element={<Menu />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/fam' element={<Famous/>}/>
      <Route path='/reg' element={<Registering />} />
      <Route path='/snack' element={<Snacksup />} />
      <Route path='/order' element={<Gupload />}/>
      <Route path='/edit/:id' element={<Edit/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    
        <Bottom/>


    </BrowserRouter>
  );
}

export default App;
