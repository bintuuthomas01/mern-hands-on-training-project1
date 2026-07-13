import React from 'react'
import { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'

const AddProduct = () => {

  const {register,handleSubmit,reset,setValue,watch} = useForm()

  const callBackend = async(data) =>{
    const url = "http://localhost:3000/product";
    try {
      const response = await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      alert("Product Added!");
      reset();
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  }

  const generateDescription = async()=>{
    const title = watch("title");
    const keywords = watch("keywords");
    if (!title) {
      alert("Enter a product name first");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/generate-description" ,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: title, keywords }),
      });
      const data = await res.json();
      setValue("description", data.description);
    } catch (err) {
      console.error(err);
      alert("AI generation failed");
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit(callBackend)}
        className='bg-white p-6 rounded-lg shadow-md w-96 space-y-4'
      >
         <input
          {...register("title")}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
         <input
          {...register("price")}
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
      <input
          {...register("image")}
          placeholder="Product image"
          className="w-full border p-2 rounded"
        />
      <input
          {...register("keywords")}
          placeholder="Keywords (e.g. trendy, waterproof)"
          className="w-full border p-2 rounded"
        />
        <button
          type="button"
          onClick={generateDescription}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
        >
         Generate Description with AI
        </button>

        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border p-2 rounded h-24"
        />
         <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
           Add Product
        </button>
      </form>


    </div>
  )
}

export default AddProduct