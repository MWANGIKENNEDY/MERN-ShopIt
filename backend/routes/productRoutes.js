module.exports=(app)=>{
    const router = require('express').Router();

    const product = require('../controllers/productControllers');

    router.get('/',product.getAllProducts);
    router.get('/:productId',product.getOneProduct);
    router.post('/new',product.newProduct);
    router.put('/:productId',product.updateProduct);
    router.delete('/:productId',product.deleteProduct);

    app.use('/api/v1/shopit/products',router);
}