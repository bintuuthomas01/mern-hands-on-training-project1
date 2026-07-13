const express = require("express");
const Product = require('./modes/product'); 
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET all products
app.get('/product', async(req, res) => {
    try {
        // 2. Changed 'product.find()' to 'Product.find()'
        const products = await Product.find(); 
        res.status(200).json(products);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// POST a new product
app.post('/product', async(req, res) => {
    try {
        const { title, price, description, image } = req.body;
        
        // 3. Changed 'new product(...)' to 'new Product(...)'
        const newProduct = new Product({ title, price, description, image });
        await newProduct.save();
        
        res.status(201).json({ message: "Product Added", product: newProduct });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// update product

app.patch('/product/:id', async(req,res)=>{
  try{
    const productId=req.params.id
    if(!productId){
      return res.status(400).json
      ({error:"Product ID is required"})
    }
    if(!req.body){
      return res.status(400).json
      ({error:"Product Details Cannot be empty"})
    }
    const product=await Product.findByIdAndUpdate(productId,req.body,{new:true})
    res.status(200).json({message:"Product Updated",product})
  }
  catch(error){
    console.log(error)
    res.status(500).json({error:error.message})
  }
})

// Delete product

app.delete('/product/:id', async(req,res)=>{
  try{
    const productId=req.params.id
    if(!productId){
      return res.status(400).json
      ({error:"Product ID is required"})
    }
    const product=await Product.findByIdAndDelete(productId)
    res.status(200).json({message:"Product Deleted"})
  }
  catch(error){
    console.log(error)
    res.status(500).json({error:error.message})
  }
})

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(process.env.MONGODBURL);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
  }
}
main();

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
