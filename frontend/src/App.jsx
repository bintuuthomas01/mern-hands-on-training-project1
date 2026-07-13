import React from 'react'
import Products from './components/Products'
import AddProduct from './components/AddProduct'
import Home from './pages/Home'
import {BrowserRouter , Routes,Route,NavLink} from 'react-router-dom'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <nav className='bg-gray-800 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <ul className='flex space-x-6 py-4'><li><NavLink to='/'
        className='text-white hover:text-gray-300'>Home</NavLink></li>
        <li><NavLink to='/Products'
        className='text-white hover:text-gray-300'>Products</NavLink></li>
        <li><NavLink to='/add-product'
        className='text-white hover:text-gray-300'>Add Product</NavLink></li>
        
        </ul>
      </div>

    </nav>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Products' element={<Products />} />
      <Route path='/add-product' element={<AddProduct />} />
    </Routes>

    </BrowserRouter>

</>
  )
}

export default App
