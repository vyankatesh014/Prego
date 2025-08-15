import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'


const BestSeller = () => {
    const { products } = useAppContext(); // Assuming useAppContext is imported from context
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium' >Best Sellers</p>
        <div>
            <ProductCard product={products[0]}/>
        </div>
        
    </div>
  )
}

export default BestSeller