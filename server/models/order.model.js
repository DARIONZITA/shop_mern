import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    products: {
      type: Array,
      required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        require: true
    },
    frete: {
      type: String,
      required: [true, "Please add a product Name"],
    },
    prices: {
       priceTotal:{
        type: Number,
        required: true
       },     
       pricePaid:{
        type: Number,
        required: true
       }
    },
    coordinates: {
      type: Array,
      required: true,
    },
    isDone: {
      type: Boolean,
      require: true,
      default: false

    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);