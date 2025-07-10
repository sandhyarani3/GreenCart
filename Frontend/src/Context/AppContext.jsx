 import {createContext, useContext,useEffect,useState} from 'react'
 import {useNavigate} from 'react-router-dom'
import { dummyProducts } from '../assets/assets';
import toast from 'react-hot-toast';
import axios from "axios";

axios.defaults.withCredentials=true;//send cookies in api requests
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL
 export const AppContext=createContext();

 export const AppContextProvider=({children})=>{

    const navigate=useNavigate();
    const [user,setUser]=useState(null);
    const [isSeller,setIsSeller]=useState(false);
    const [showUserLogin,setShowUserLogin]=useState(false);
    const [product,setProduct]=useState([])
    const [cartItems,setCartItems]=useState({})
    const [searchQuery,setSearchQuery]=useState({})

    const currency=import.meta.VITE_CURRENCY;


    //fetch user Auth status ,user data and cartItems
    const fetchUser=async()=>{
      try {
        const {data}=await axios.get('/api/user/is-auth');
        if(data.success){
          setUser(data.user);
          setCartItems(data.user.cartItems);
        }
      } catch (error) {
        setUser(null);
        
      }
    }
   
    //fetch seller status
    const fetchSeller=async()=>{
      try {
        const {data}=await axios.get('/api/seller/is-auth');
        if(data.success){
          setIsSeller(true);
        }
        else{
          setIsSeller(false);
        }
      } catch (error) {
        setIsSeller(false);
      }
    }


    //To fetch all products
    const fetchProducts=async()=>{
       try {
         const {data}=await axios.get('/api/product/list');
         if(data.success){
          setProduct(data.products);
         }
         else{
          toast.error(data.message);
         }
       } catch (error) {
          toast.error(error.message);
       }
    }

    //Add product to cart
    const addToCart=(itemID)=>{
      let cartData=structuredClone(cartItems);
    
    if(cartData[itemID]){
      cartData[itemID]+=1;
    }else{
      cartData[itemID]=1;
    }
    toast.success('Added to Cart');
    setCartItems(cartData);
    // updateCartItem(itemID,cartData[itemID]);
  }

  //update cart
  const updateCartItem=(itemID,quantity)=>{
    let cartData=structuredClone(cartItems);
    cartData[itemID]=quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  }

  //remove cart

  const removeFromCart=(itemID)=>{
   let cartData=structuredClone(cartItems);
   if(cartData[itemID]){
    cartData[itemID]-=1;
    if(cartData[itemID]===0){
      delete cartData[itemID];
    }
   }
   toast.success('Removed from Cart');
  //  updateCartItem(itemID,cartData[itemID]);
   setCartItems(cartData);
  }
  //get CartItem count
  const getCartCount=()=>{
    let totalCount=0;
    for(const item in cartItems){
      totalCount+=cartItems[item];
    }
    return totalCount
  }

  //get total Amount
  const getCartAmount=()=>{
    let totalAmount=0,itemInfo;
    for(const items in cartItems){
      if(cartItems[items]>0){
        itemInfo=product.find((product)=>product._id===items)
        totalAmount+=itemInfo.offerPrice*cartItems[items];
      }
    }
    return Math.floor(totalAmount*100)/100;
  }

    useEffect(()=>{
      fetchUser();
     fetchProducts();
     fetchSeller();
    },[])

    //update cart items
    useEffect(()=>{
      const updateCart=async()=>{
        try {
          const {data}=await axios.post('/api/cart/update',{cartItems})
          if(!data.success){
            toast.error(data.message)
          }
        } catch (error) {
           toast.error(error.message);
        }
      }
      if(user){
        updateCart()
      }
    },[cartItems])

    const value={navigate,user,setUser,isSeller,setIsSeller,
      showUserLogin,setShowUserLogin,product,currency,addToCart,updateCartItem,removeFromCart,cartItems,
      searchQuery,setSearchQuery,getCartAmount,getCartCount,axios,fetchProducts,setCartItems
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
 }

 export const useAppContext=()=>{
    return useContext(AppContext)
 }