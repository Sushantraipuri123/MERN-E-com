import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Account from "./components/account/Account";
import Login from "./components/account/login/Login";
import Register from "./components/account/register/Register";
import { useAuth } from "./store/Auth";
import Profile from "./components/account/profile/Profile";
import Logout from "./components/account/logout/Logout";
import AddProduct from "./components/account/addproducts/AddProducts";
import AllProducts from "./components/products/allproducts/AllProducts";
import SingleProduct from "./components/products/singleproduct/SingelProduct";
import ProductsByCategory from "./components/products/categories/ProductByCategory";
import MyProducts from "./components/account/myProducts/MyProducts";
import DeliveredOrders from "./components/account/deliveredorders/DeliveredOrders";
import RecivedOrders from "./components/account/recivedOrders/RecivedOrders";
import MyOrders from "./components/account/myOrders/MyOrders";
import EditProduct from "./components/account/myProducts/EditProduct";
import Carts from "./components/carts/Carts";
import CheckOut from "./components/checkout/CheckOut";
import SeahrchedProducts from "./components/searchbar/SeahrchedProducts";
import OrderDetails from "./components/account/myOrders/OrderDetails";
import RecivedOrdersDetails from "./components/account/recivedOrders/RecivedOrdersDetails";
import ScrollToTop from "./utilities/ScrollToTop";
import Faq from "./components/pages/Faq";
import Tc from "./components/pages/Tc";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import Refund from "./components/pages/Refund.";
import Contact from "./components/contact/Contact";

function App() {
  const { isLoggedin } = useAuth();

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          {/* account nested routes */}
          <Route path="/account/*" element={<Account />}>
            <Route
              index
              element={isLoggedin ? <Profile /> : <Navigate to="login" />}
            />
            <Route
              path="login"
              element={isLoggedin ? <Navigate to="/account" /> : <Login />}
            />
            <Route
              path="register"
              element={isLoggedin ? <Navigate to="/account" /> : <Register />}
            />
            <Route
              path="add-products"
              element={isLoggedin ? <AddProduct /> : <Navigate to="login" />}
            />
            <Route
              path="my-products"
              element={isLoggedin ? <MyProducts /> : <Navigate to="login" />}
            />
            <Route
              path="delivered-orders"
              element={
                isLoggedin ? <DeliveredOrders /> : <Navigate to="login" />
              }
            />
            <Route
              path="received-orders"
              element={isLoggedin ? <RecivedOrders /> : <Navigate to="login" />}
            />
            <Route
              path="my-orders"
              element={isLoggedin ? <MyOrders /> : <Navigate to="login" />}
            />
            <Route path="logout" element={<Logout />} />
          </Route>

          <Route path="products" element={<AllProducts />} />
          <Route path="products/:id" element={<SingleProduct />} />

          {/* New Route for products by category */}
          <Route path="product/:category" element={<ProductsByCategory />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="cart" element={<Carts />} />
          {/* routes for checkout  */}
          <Route path="/check-out/:id" element={<CheckOut />} />
          <Route path="/searched-products" element={<SeahrchedProducts />} />
          {/* order details routes  */}
          <Route path="/my-orders/:id" element={<OrderDetails />} />
          <Route path="/recived-orders/:id" element={<RecivedOrdersDetails/>} />
         {/* Pages routes */}
         <Route path="faq" element={<Faq/>} />
         <Route path="terms" element={<Tc/>} />
         <Route path="privacy" element={<PrivacyPolicy/>} />
         <Route path="refund" element={<Refund/>} />

         <Route path="contact" element={<Contact/>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
