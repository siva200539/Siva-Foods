import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Bottom from "./components/Bottom";

// ✅ Pages
import Home from "./Layout/Home";
import Menu from "./Layout/Menu";
import Cartpage from "./Layout/Cart"; // renamed for clarity
import Famous from "./components/Famous";
import Registering from "./Layout/Registering"; // Order Register Page
import Snacksup from "./pages/Snacksup";
import Gupload from "./pages/Gupload";
import Edit from "./pages/Edit";
import Login from "./Layout/Login";
import Contact from "./Layout/Contact";
import OrderSummary from "./pages/Register";

// ✅ Context
import { UserProvider } from "./constant/UserContext";

// ✅ Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          {/* ✅ Navbar */}
          <Nav />

          {/* ✅ All Routes */}
          <Routes>
            {/* Login is the first (landing) page */}
            <Route path="/login" element={<Login />} />

            {/* Main pages */}
            <Route path="/home" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cartpage />} />
            <Route path="/fam" element={<Famous />} />
            <Route path="/reg" element={<Registering />} /> {/* Register Order Page */}
            <Route path="/snack" element={<Snacksup />} />
            <Route path="/order" element={<Gupload />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/regis" element={<OrderSummary />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          {/* ✅ Footer */}
          <Bottom />
        </BrowserRouter>
      </UserProvider>
    </Provider>
  );
}

export default App;
