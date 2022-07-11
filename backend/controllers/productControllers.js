
const productModel = require('../models/product');
exports.newProduct= async(req,res,next)=>{

    try{
        const product= await productModel.create(req.body)
        res.status(201).json({
            success: true,
            product
        })

    }catch(err){
        console.log(err);
        res.status(500).json({error: err});
        return;

    }

}

exports.getAllProducts = async (req,res,next) =>{

    try{
        const products = await productModel.find();

        res.status(200).json({
            success:true,
            count:products.length,
            products
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({error: error});
        return;
    }
    
}

exports.getOneProduct = async (req,res,next) =>{

    try {

        const product = await productModel.findById(req.params.productId);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        return res.status(404).json({
            success:true,
            product
        })
        
    } catch (error) {
        console.log(error);
        process.exit();
    }


}

exports.updateProduct = async (req,res,next) =>{

    try {
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
        
    } catch (error) {
        console.log(error);
        process.exit();
    }


}

exports.deleteProduct = async (req,res,next) =>{

    try {
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
        
    } catch (error) {
        console.log(error);
        process.exit();
    }


}

