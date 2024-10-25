import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Layout from './layouts/layout/Layout';
import Home from './pages/Home/home';
import Calculator from './pages/Calculator/calculator';
import Component from './pages/Components/components';
import Todo from './pages/Todo/todo';
import Product from './pages/Products/products';
import Cart from './pages/Carts/carts';
import Animation from './pages/Animation/animation';
import Login from './pages/Login/login';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import { fetchProducts } from './deta/products';
import './App.css';

const inTap = 'home';

function App() {
  const [token, setToken] = useState('');  // ค่าเริ่มต้น token เป็น ''
  const [role, setRole] = useState('');    // เพิ่ม state สำหรับ role
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [tap, setTap] = useState(inTap);

  useEffect(() => {
    setTap(inTap);
  }, []); // first load

  useEffect(() => {
    setProducts(fetchProducts());
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  // ตรวจสอบว่า token ว่างหรือไม่
  if (token === '') {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      <div className='app-container'>
        <HashRouter>
          <Routes>
            <Route element={<Layout tap={tap} setTap={setTap} products={products} cart={cart} setToken={setToken} />}>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/calculator' element={<Calculator />} />
              <Route path='/animation' element={<Animation />} />
              <Route path='/component' element={<Component />} />
              <Route path='/todo' element={<Todo />} />
              <Route path='/product' element={<Product products={products} cart={cart} setCart={setCart} />} />
              <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
