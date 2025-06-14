const  express = require('express');
const Product = require('./product.model');
const { postAProduct, getAllProducts,getSingleProduct, updateProduct, deleteAProduct } = require('./product.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

//frontend => backend server => controller => product schema => database => send to server => back 
//to the frontend
//post = when submit something frontend to db
//get = when get something back from db
//put/patch = when edit or update something
//delete = when delete something


//post a product
router.post("/create-product",verifyAdminToken, postAProduct)


//get all products 
router.get("/", getAllProducts);

//single product endpoint
router.get("/:id", getSingleProduct);

//update a product endpoint
router.put("/edit/:id",verifyAdminToken,updateProduct);

//delete product
router.delete("/:id",verifyAdminToken,deleteAProduct)

module.exports = router;
