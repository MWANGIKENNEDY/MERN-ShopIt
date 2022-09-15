
const productModel = require('../models/product');
const errorHandler = require('../utils/errorHandler');

const catchAsyncErrors= require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apIFilterSearchPage');


exports.newProduct= catchAsyncErrors( async(req,res,next)=>{
        const product= await productModel.create(req.body)
        res.status(201).json({
            success: true,
            product
        })
})

//get all - api/v1/shopit/product?keyword=apple
//demonstrating search functionality
exports.getAllProducts = catchAsyncErrors(async (req,res,next) =>{
    //how many results we want per page
    const resultsPerPage = 4;
    //get the count document
    const productCount= await productModel.countDocuments();
    //creating an object of type APIFeatures
    const apiFeatures = new APIFeatures(productModel.find(),req.query).search().filter().pagination(resultsPerPage);
    //query property  = productModel.find()
    const products = await apiFeatures.query;
    res.status(200).json({
        success:true,
        count:products.length,
        productCount,
        products
    });
})

exports.getOneProduct = catchAsyncErrors( async (req,res,next) =>{
    const product = await productModel.findById(req.params.productId);
    if(!product){
        return next(new errorHandler("Product not found",404))
    }
    return res.status(200).json({
        success:true,
        product
    })  
})

exports.updateProduct = catchAsyncErrors(async (req,res,next) =>{
    let product = await productModel.findById(req.params.productId);
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    product = await productModel.findByIdAndUpdate(req.params.productId,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    return res.status(200).json({
        success:true,
        product
    })
})

exports.deleteProduct = catchAsyncErrors( async (req,res,next) =>{
    const product = await productModel.findById(req.params.productId);
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    await product.remove();
    return res.status(200).json({
        success:true,
        message:"Product deleted"
    })  
})

