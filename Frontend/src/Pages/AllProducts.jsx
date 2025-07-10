import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import ProductCard from '../Components/ProductCard';

const AllProducts = () => {

    const {product,searchQuery}=useAppContext();
    const[filterProducts,setFilterProducts]=useState([]);

    useEffect(()=>{
     if(searchQuery.length>0){
        setFilterProducts(product.filter(
            product=>product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
     }
     else{
        setFilterProducts(product);
     }
    },[product,searchQuery])


  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
      <p className='text-2xl font-medium uppercase'>All products</p>
      <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      <div className='grid grid-cols-1 place-items-center sm:grid-cols-3  md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        {filterProducts.filter((product)=>product.instock).map((product,index)=>(
         <ProductCard key={index} product={product}/>
         ))}
      </div>
    </div>
  )
}

export default AllProducts
