import mongoose from "mongoose";
import Mark from "../models/mark.model.js";
const addMark=async(req, res)=>{
     // console.log({ detailOne });

  const post = req.body;

  // console.log(post.description[0].detailOne);

  // for errors
  let emptyFields = [];

  if (!post.name) {
    emptyFields.push("name");
  }
  if (!post.coordinates) {
    emptyFields.push("coordinates");
  }
  

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Fill in all fields.", emptyFields });
  }

  // adding data to db
  try {
   
    const mark = await Mark.create(
      post
    )
    if(!mark){
      return res.status(400).send({error: "error to create,try again"})
    }

    
    res.status(201).json(mark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

const getMarks=async(req, res) => {
  try {
    const sortObject =
      req.query.sort === "oldest" ? { name: -1 } : { name: 1 };

    const search = req.query.search || "";

    const marksData = await Mark.find({
      name: { $regex: search, $options: "i" }
    })
      .sort(sortObject)
    

    const total = await Mark.countDocuments({
      name: { $regex: search, $options: "i" }
    });

    const response = {
      error: false,
      total,
      marksData,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
    
}
const removeMark=async(req, res)=>{
const idMarker=mongoose.Types.ObjectId(req.params.idMarker) //id marker


  if (!mongoose.Types.ObjectId.isValid(idMarker)) {
    return res.status(400).json({ error: "id is not valid" });
  }
  try {
    const marker = await Mark.findByIdAndRemove(idMarker);
    if(!marker){return res.status(400).json({ error: "Error, try again" });}
    const marksData = await Mark.find().sort({ name: 1 })
    

    const total = await Mark.countDocuments();
    const response = {
      error: false,
      total,
      marksData,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
}


export {
    addMark,
    getMarks,
    removeMark
    
}