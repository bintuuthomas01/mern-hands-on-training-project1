import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Product from './Product'
const Products = () => {
     const[data,setData]=useState([])
     const url="http://localhost:3000/product"
     useEffect(()=>{
         const fetchData=async()=>{
            try{

                const response=await axios.get(url)
                console.log(response)
               setData(response.data)
            }catch(error){
                console.log(error)
            }
         }
         fetchData()
     },[])
    
  return (
   
    <div>
      <ul className='grid grid-cols-1
      sm:grid-cols-2 md:grid-cols-3 1g:grid-cols-4
      gap-6'>
        
        {data.map((product)=>(
        <Product key={product._id} 
        title={product.title}
        description={product.description}
        image={product.image}
        price={product.price}
        className='m-3'>{product.title}</Product>
    ))
}
      </ul>
    </div>
  )
}

export default Products