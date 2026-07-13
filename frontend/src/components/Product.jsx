import React from 'react'

const Product = ({title,image,description,price}) => {

  return (
    <div
      className='flex flex-col h-full border rounded-lg p-4'>
        <img
        src={image}
        alt={title}
        className='w-full h-40 object-cover' />
        <div className='flex flex-col p-4 gap-1.5'>
            <h2 className='text-lg font-bold text-gray-800'>
                {title}
            </h2>
            <p className='text-gray-600 text-sm'>
              {description}
            </p>
            <p className='text-xl font-semibold text-green-600'>
              {price}
            </p>
            <button className='mt-auto w-full bg-blue-500 text-white py-2
             rounded-lg hover:bg-blue-800'>
              View Details
            </button>
        </div>

    </div>
  )
}

export default Product