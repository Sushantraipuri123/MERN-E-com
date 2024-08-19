import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './Layout';
import Home from './components/home/Home';
import About from './components/about/About';
import Account from './components/account/Account';
import Login from './components/account/login/Login';
import Register from './components/account/register/Register';



function App() {
 

  return (
   <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='about' element={<About/>} />
          <Route path="/account/*" element={<Account />}>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
        </Route>
        </Route>
      </Routes>
    </Router>
   </>
  )
}

export default App
