import { Outlet } from 'react-router-dom'
import Header from './utilities/header/Header'
import Footer from './utilities/footer/Footer'

function Layout() {
  return (
    <>
      <Header/>
      <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout