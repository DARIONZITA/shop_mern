import dotenv from "dotenv";
dotenv.config()
//connect db
import connectDb from "./database/db.js"

// connect to db

connectDb()

// imports
import express from "express";

import cors from "cors"
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

const port=process.env.PORT || 3000
// store it in app const
const app = express();

// middleware
// it parses incoming request bodies in the JSON format and makes the parsed data available in the req.body property of the request object.
app.use(express.json({ limit: "50mb" }));
app.use(cors());


// routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes)


app.listen(port, () => {
  console.log("port is running!", port);
});


