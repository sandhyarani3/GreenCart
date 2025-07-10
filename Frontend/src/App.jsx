import { useState } from 'react'
import { Routes,Route, useLocation } from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'
import HomePage from './Pages/HomePage.jsx'
import {Toaster} from 'react-hot-toast'
import Footer from './Components/Footer.jsx'
import { useAppContext } from './Context/AppContext.jsx'
import Login from './Components/Login.jsx'
import AllProducts from './Pages/AllProducts.jsx'
import ProductCategory from './Pages/ProductCategory.jsx'
import ProductDetails from './Pages/ProductDetails.jsx'
import Cart from './Pages/Cart.jsx'
import AddAddress from './Pages/AddAddress.jsx'
import MyOrders from './Pages/MyOrders.jsx'
import SellerLogin from './Components/Seller/SellerLogin.jsx'
import SellerLayout from './Pages/seller/SellerLayout.jsx'
import AddProduct from './Pages/seller/AddProduct.jsx'
import ProductList from './Pages/seller/ProductList.jsx'
import Orders from './Pages/seller/Orders.jsx'
import Loading from './Components/Loading.jsx'
function App() {
  const isSellerPath=useLocation().pathname.includes('seller');
  const {showUserLogin,isSeller}=useAppContext();
  
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null :<Navbar/>}
      {showUserLogin ? <Login/>:null}
      <Toaster/>
      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/products' element={<AllProducts/>}/>
        <Route path='/products/:category' element={<ProductCategory/>}/>
        <Route path='/products/:category/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/add-address' element={<AddAddress/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>
        <Route path='/loader' element={<Loading/>}/>
        <Route path='/seller' element={isSeller ? <SellerLayout/> :<SellerLogin/>}>
           <Route index element={isSeller ? <AddProduct/> :null}/>
           <Route path='product-list' element={<ProductList/>}/>
           <Route path='orders' element={<Orders/>}/>
        </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
  
    </div>
  )
}

export default App
