import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './components/home/Home';
import About from './components/about/About';
import Account from './components/account/Account';
import Login from './components/account/login/Login';
import Register from './components/account/register/Register';
import { useAuth } from './store/Auth';
import Profile from './components/account/profile/Profile';
import Logout from './components/account/logout/Logout';
import AddProduct from './components/account/addproducts/AddProducts';

function App() {
  const { isLoggedin } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/account/*" element={<Account />}>
            {/* If the user is logged in, show the Profile by default, otherwise redirect to Login */}
            <Route index element={isLoggedin ? <Profile /> : <Navigate to="login" />} />
            
            {/* If the user is logged in, prevent access to login and register routes */}
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
              element={isLoggedin ? <AddProduct/> : <Navigate to="login" />}
            />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
