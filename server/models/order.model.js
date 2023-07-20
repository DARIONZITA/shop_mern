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
    contact:{
      type: String,
      default:'WhatsApp'
    },
    orderDate:{
      type:Date,
      require:true,
      default: Date.now
    },
    createdAt: { 
      type: Date,
      default: Date.now,
      expires: "30d"
      }
    
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order 