import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: [
      {
        _id: false,
        productId:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'Product',
          require:true
        },
        quantity:{
          type:Number,
          require:true
        }
      }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        require: true
    },
    frete: {
      type: Number,
      required: true,
    },
    prices: {
       priceTotal:{
        type: Number,
        required: true
       },     
       pricePaid:{
        type: Number,
        required: true,  
        default:0
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
    createdAt: { 
      type: Date,
      default: Date.now,
      expires: "30d"
      }
    
  }
);

export default mongoose.model("Order", orderSchema);