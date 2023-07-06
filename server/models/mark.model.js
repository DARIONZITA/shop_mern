import mongoose from "mongoose";
const Schema = mongoose.Schema;

const markSchema = new Schema(
  {
   name:{
    type: String,
    require: true
   },
   coordinates:{
    type: Array,
    require : true
   }
  }
);

export default mongoose.model("Mark", markSchema);