import React from 'react'
import { useAppContext } from '../Context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../Components/ProductCard'

const ProductCategory = () => {
    const {product}=useAppContext()
    const {category}=useParams();

   
    const filteredProducts=product.filter((product)=>product.category.toLowerCase()===category)
  return (
    <div className='mt-16'>
      {filteredProducts.length>0 ? (
        <div className='flex flex-col items-start w-max'>
           <p className='text-2xl font-medium'>{category.toUpperCase()}</p>
           <div className='w-16 h-0.5  bg-primary rounded-full'></div>
           <div className='mt-6 grid grid-cols-1 place-items-center sm:grid-cols-3 gap-6 md:grid-cols-5 md:gap-3 lg:grid-cols-6'>
           {filteredProducts.map((product,index)=>(
            <ProductCard key={index} product={product}/>
           ))}
           </div>
           
        </div>
      ):
      (  
          <p className='text-center text-primary font-medium text-3xl'>No products found in this category</p>
      )
      }
    </div>
  )
}

export default ProductCategory
