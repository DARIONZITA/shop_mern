import mongoose from "mongoose"



const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  numberPhone: {
    type: Number,
    required: true,
    unique:true 
  },
  confirmationCode: {
    type: String,
    required:true
   },
   createdAt: { 
    type: Date,
    default: Date.now,
    expires: "15m"
    },
});

// signup static method
customerSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  passwordHash,
  numberPhone,
  confirmationCode
) {

    const emailExistPending = await this.findOneAndUpdate(
        {email:email},
        {
            firstName,
            lastName,
            email,
            password:passwordHash,
            numberPhone,
            confirmationCode
        })
  
    if (emailExistPending===null){
        // store in the database .. creates a document with email and pass
        const customer = await this.create({
            firstName,
            lastName,
            email,
            password:passwordHash,
            numberPhone,
            confirmationCode

        });
        
        return customer;

    }
    return emailExistPending
  
  
};


export default mongoose.model("CustomerPending", customerSchema);
