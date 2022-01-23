import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navibar from "./views/components/navbar.jsx";
import Login from "./views/loginPage/loginPage.jsx";
import Customers from "./views/customers/index.jsx";
import AddCustomer from "./views/customers/addCustomer.jsx";
import EditCustomer from "./views/customers/editCustomer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navibar />
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/edit/:id" element={<EditCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
