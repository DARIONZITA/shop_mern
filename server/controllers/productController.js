 import mongoose from "mongoose";
import Product from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import {updateProducts} from "../servers/product.service.js"
// CREATE
const createProduct = async (req, res) => {
  // console.log({ detailOne });

  const post = req.body;

  // console.log(post.description[0].detailOne);

  // for errors
  let emptyFields = [];

  if (!post.category) {
    emptyFields.push("category");
  }
  if (!post.name) {
    emptyFields.push("name");
  }
  if (!post.price) {
    emptyFields.push("price");
  }
  if (!post.stock) {
    emptyFields.push("stock");
  }
  if (!post.imgOne) {
    emptyFields.push("imgOne");
  }
  if (!post.imgTwo) {
    emptyFields.push("imgTwo");
  }

  //if (!post.description[0].detailOne) {
    // emptyFields.push("detailOne");
   //}
  //if (!post.description[1].detailTwo) {
    // emptyFields.push("detailTwo");
   //}

  post.description.forEach((value, index) => {
    if (!value.detailOne) {
      emptyFields.push(`description[${index}].detailOne`);
    }
    if (!value.detailTwo) {
      emptyFields.push(`description[${index}].detailTwo`);
    }
  });
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Fill in all fields.", emptyFields });
  }

  // adding data to db
  try {
    // Upload an image to Cloudinary
    const result1 = await cloudinary.uploader.upload(post.imgOne, {
      folder: "shope",
    });

    const result2 = await cloudinary.uploader.upload(post.imgTwo, {
      folder: "shope",
    });

    const product = await Product.create({
      ...post,
      imgOne: {
        public_id: result1.public_id,
        url: result1.secure_url,
      },
      imgTwo: {
        public_id: result2.public_id,
        url: result2.secure_url,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
const readProducts = async (req, res) => {
  try {
    const sortObject =
      req.query.sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const search = req.query.search || "";
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 9;
    const maxPrice= parseInt(req.query.maxPrice) || 1000000


    let category = req.query.category || "All";

    const categoryOptions = await Product.distinct("category");

    category === "All"
      ? (category = categoryOptions)
      : (category = req.query.category.split(","));

    const productsData = await Product.find({
      name: { $regex: search, $options: "i" },
      price: { $lte: maxPrice },
      category: { $in: category }
    })
      .sort(sortObject)
      .skip(page * limit)
      .limit(limit);

    const total = await Product.countDocuments({
      category: { $in: [...category] },
      name: { $regex: search, $options: "i" },
      price: { $lte: maxPrice } 
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      categories: categoryOptions,
      productsData,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ONE
const readProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "id is not valid" });
  }

  try {
    // if id is valid then it will try to find the data
    const product = await Product.findById(id);

    // checks if data doesnt exist
    if (!product) {
      return res.status(400).json({ error: "product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "id is not valid" });
  }

  // for errors
  let Fields = [];

  if (post.category) {
    Fields.push("category");
  }
  if (post.name) {
    Fields.push("name");
  }
  if (post.stock) {
    Fields.push("stock");
  }
  if (post.price) {
    Fields.push("price");
  }
  if (post.imgOne) {
    Fields.push("imgOne");
  }
  if (post.imgTwo) {
    Fields.push("imgTwo");
  }

  post.description?.forEach((desc, index) => {
    console.log('passou')
    if (desc.detailOne) {
      Fields.push(`description[${index}].detailOne`);
    }
    if (desc.detailTwo) {
      Fields.push(`description[${index}].detailTwo`);
    }
  });

  if (Fields.length < 1) {
    return res.status(400).json({ error: "Fill in all fields.", Fields });
  }

  try {
    const currentProduct = await Product.findById(id);

    const data = {
      ...post,
    };

    if (!currentProduct) {
      return res.status(400).json({ error: "product not found" });
    }
  

    if (post.imgOne) {
      const imgId1 = currentProduct.imgOne.public_id;

      // if the current image is same as the image in the input
      //  we will upload a new 
    if(post.imgOne.public_id){
      if (imgId1 !== post.imgOne.public_id ) {
        if (imgId1) {
            await cloudinary.uploader.destroy(imgId1);
          }
        }
    }
      
    

        // Upload an image to Cloudinary
        const newImage1 = await cloudinary.uploader.upload(post.imgOne, {
          folder: "shope",
        });

        data.imgOne = {
          public_id: newImage1.public_id,
          url: newImage1.secure_url,
        };
      }
    

    if (post.imgTwo) {
      const imgId2 = currentProduct.imgTwo.public_id;
      if(post.imgOne.public_id){
        if (imgId2 !== post.imgTwo.public_id) {
            if (imgId2) {
              await cloudinary.uploader.destroy(imgId2);
            }}}
          

        // Upload an image to Cloudinary
        const newImage2 = await cloudinary.uploader.upload(post.imgTwo, {
          folder: "shope",
        });

        data.imgTwo = {
          public_id: newImage2.public_id,
          url: newImage2.secure_url,
        };
      }
    

    const product = await updateProducts(id, data);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateCategory = async(req, res)=>{
  const { id } = req.params;
  const newCategory = req.body.category;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "id is not valid" });
  }
  try {
    const currentProduct = await Product.findById(id);

    if (!currentProduct) {
      return res.status(400).json({ error: "product not found" });
    }

    const product = await Product.findByIdAndUpdate({_id: id},{$push:{category:newCategory}}, { new: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 

// DELETE
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "id is not valid" });
  }

  try {
    const product = await Product.findById(id);
    //retrieve current image ID
    const imgIdOne = product.imgOne.public_id;
    if (imgIdOne) {
      await cloudinary.uploader.destroy(imgIdOne);
    }

    const imgIdTwo = product.imgTwo.public_id;
    if (imgIdTwo) {
      await cloudinary.uploader.destroy(imgIdTwo);
    }

    const DeletedProduct = await Product.findByIdAndRemove(id);

    if (!DeletedProduct) {
      return res.status(400).json({ error: "product not found" });
    }

    res.status(200).json(DeletedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  createProduct,
  readProducts,
  readProduct,
  updateProduct,
  updateCategory,
  deleteProduct,
};
