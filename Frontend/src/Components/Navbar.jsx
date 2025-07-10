import React,{useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'
const Navbar = () => {
    const [open, setOpen] = useState(false)
    const {user,setUser,setShowUserLogin,navigate,searchQuery,setSearchQuery,getCartCount,axios}=useAppContext();
    const [showProfileMenu,setShowProfileMenu]=useState(false);

    const logout=async()=>{
        try {
            const {data}=await axios.get('/api/user/logout');
            if(data.success){
                toast.success(data.message);
                setUser(null);
               setShowProfileMenu(false)
            navigate('/')
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        
    }
    useEffect(()=>{
     if(searchQuery.length>0){
        navigate('/products');
     }
    },[searchQuery])

  return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to='/' onClick={()=>setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Products</NavLink>
                <NavLink to='/'>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=>setSearchQuery(e.target.value)}className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="search" className='w-4 h-4' />
                </div>

                <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.cart_icon} alt="cart icon" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

            {!user ?(<button onClick={()=>setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                Login
            </button>)
            :
            (
                <button onClick={() => setShowProfileMenu(prev => !prev)} className='cursor-pointer'>
               <img src={assets.profile_icon} alt="profile_icon" className='w-10'/>
               </button>
            )
            }
            </div>
            
           
        {showProfileMenu && (
        <ul className="absolute bg-white border p-2 right-4 top-16 z-50 shadow-md text-sm rounded">
        <li onClick={()=>{
            setShowProfileMenu(false)
            navigate('/my-orders')}} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">My Orders</li>
         <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={logout}>Logout</li>
       </ul>
        )}
            

            <div className='flex items-center gap-6 sm:hidden'>
            <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.cart_icon} alt="cart icon" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
             </div>
            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt="menu" />
            </button>
        
            </div>
            

            {/* Mobile Menu */}
        {open && (<div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
            <NavLink to='/' onClick={()=>setOpen(false)}>Home</NavLink>
            <NavLink to='/products' onClick={()=>setOpen(false)}>All Products</NavLink>
            {user && <NavLink to='/products' onClick={()=>setOpen(false)}>My Orders</NavLink>}

            <NavLink to='/' onClick={()=>setOpen(false)}>Contact</NavLink>
            {!user ? (
                <button onClick={()=>{setOpen(false)
                setShowUserLogin(true)
                }}
                className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                Login
            </button>
            ):(
                <button onClick={()=>{
                    logout();
                    setOpen(false);
                    }}
                className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                Logout
            </button>
            )}
            
        </div>)}

        </nav>
  )
}

export default Navbar
