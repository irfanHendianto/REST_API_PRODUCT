//initialize routes
let router = require('express').Router();

// setdefault API response
router.get('/',function(req, res){
  res.json({status:'API working',message:'welcome'});
});

var productController = require('./productController');

router.route('/list').get(productController.list);
router.route('/addProduct').post(productController.create);
router.route('/editProduct/:no').put(productController.update);
router.route('/product/:no').delete(productController.delete);  
router.route('/list/:no').get(productController.detail);  

router.route('/upload').post(productController.upload);  

module.exports = router;