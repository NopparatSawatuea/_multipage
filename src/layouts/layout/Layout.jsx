import { Outlet } from 'react-router'

import Footer from '../footers/Footer'
import Header from '../headers/Header'
import Navbar from '../navbars/Navbar'

import './Layout.css'

function Layout({tap, setTap, products, carts, setToken}) {
    return (
        <div>
            <Header />
            <Navbar tap={tap} setTap={setTap} products={products} carts={carts} setToken={setToken}/>
            <Outlet/>
            <Footer />
        </div>
    )
}

export default Layout