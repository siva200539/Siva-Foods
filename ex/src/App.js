import Nav from './components/Nav.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Layout/Home.js';
import Menu from './Layout/Menu.js';
import Bottom from './components/Bottom.js';
import Table from './Layout/Table.js';
import  Cart from './Layout/Cart.js';
import { Famous } from './components/Famous.js';
function App() {
  return (
    <BrowserRouter>
    <Nav/>
    {/* <Home/> 
    <Menu/> */}
    <Routes>
    
      <Route path='/' element={<Home/>} />  
      <Route path='/menu' element={<Menu />} />
      <Route path='/table' element={<Table />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/fam' element={<Famous/>}/>
    </Routes>
    
        <Bottom/>


    </BrowserRouter>
  );
}

export default App;
