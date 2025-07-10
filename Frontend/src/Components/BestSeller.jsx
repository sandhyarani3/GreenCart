import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../Context/AppContext'

const BestSeller = () => {
  const {product}=useAppContext();
  return (
      <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className='grid grid-cols-1 place-items-center sm:grid-cols-3 md:grid-cols-4  gap-3 md:gap-6
      lg:grid-cols-5 mt-6 items-center'>
        {product.filter((product)=>product.instock).slice(0,5).map((product,index)=>(
          <ProductCard key={index} product={product}/>
        ))}
        
      </div>
    </div>
  )
}

export default BestSeller
