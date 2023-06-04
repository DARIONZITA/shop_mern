import Product from "../models/productModel.js" 

const updateProducts=(id,data) => Product.findByIdAndUpdate(id, data, { new: true });


export {updateProducts}