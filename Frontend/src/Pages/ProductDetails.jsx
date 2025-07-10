import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../Components/ProductCard';

const ProductDetails = () => {

   
    const {product,navigate,currency,addToCart}=useAppContext();
    const {id}=useParams()
    const product1=product.find((item)=>item._id===id)
    const [relatedProducts,setRelatedProducts]=useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    

    useEffect(()=>{
        if(product.length>0){
            let productCopy=product.slice();
            productCopy=productCopy.filter((item)=>product1.category===item.category)
            setRelatedProducts(productCopy.slice(0,5))
        }
    },[product])

    useEffect(()=>{
        setThumbnail(product1?.image[0]?product1.image[0]:null)
    },[product1])

    return product1 && (
        <div className="mt-12">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={`/products/${product1.category.toLowerCase()}`}> Products</Link> /
                <Link> {product1.category}</Link> /
                <span className="text-primary"> {product1.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product1.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product1.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_,i)=>(
                            <img src={i<4 ?assets.star_icon :assets.star_dull_icon} alt="rating"
                            className='md:w-4 w-3.5'/>
                        ))}
                      
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product1.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{product1.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product1.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={()=>addToCart(product1._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=>{addToCart(product1._id);navigate('/cart')}} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            {/* relatedProducts */}
            <div className='flex flex-col items-center mt-20'>
            <div className='flex flex-col items-center w-max'>
                <p className='text-3xl font-medium'>Related Products</p>
                <div className='w-20 h-0.5 bg-primary rounded-full mt-2'></div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3
                md:gap-6 lg:grid-cols-5 mt-6 w-full'>
                    {relatedProducts.filter((product)=>product.instock).map((product,index)=>(
                        <ProductCard product={product} key={index}/>
                    ))}
                </div>
                <button className='mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition'
                onClick={()=>{navigate('/products');scrollTo}}>See more</button>
            </div>
            </div>
        </div>
    );
};

export default ProductDetails
