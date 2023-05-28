import mongoose from "mongoose";

const connectDb=()=>{
mongoose.set('strictQuery', true)
mongoose
.connect(process.env.MONG_URI,{useNewUrlParser: true, useUnifiedTopology:true})
.then(() => {
  // app.listen wIll only run after we succesfully connected to the db
  // to run this on terminal -> nodemon server.js
 console.log('DataBase connected')
})
.catch((error) => {
  console.log(error)
})
}
export default connectDb