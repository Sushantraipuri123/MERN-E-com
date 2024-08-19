const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Password should be greater than 4 characters"],
        select: false,
    },
    phoneNumber:{
        type: String,
        required: [true, "Please enter your Phone Number!"],
      },
      addresses:[
        {
          country: {
            type: String,
          },
          city:{
            type: String,
          },
          address:{
            type: String,
          },
          NerabyLandMark:{
            type: String,
          },
          Pincode:{
            type: Number,
          },
        }
      ],
      role:{
        type: String,
        default: "user",
      },
      gstNo:{
        type:String
      },
      storeName:{
        type:String
      }
},
    {
        timestamps: true
    })

        
    userSchema.pre('save', async function(next){
        console.log('pre data', this);
 
        if(!this.isModified('password')){
             return next();
        }
 
        const user = this;
        const saltRounds = 10;
        const hashedPsssword = await bcrypt.hash(user.password , saltRounds);
        user.password = hashedPsssword;
     })

         // ===============used pre function as a middlewere function to generate jwt tokken

   userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userID: this._id.toString(),
            email: this.email,
            role: this.role
        },
    process.env.JWT_SECRET_KEY,
        { expiresIn: '30d' }  //  expiry time
    )
    } catch (error) {
        console.log(error);
        throw new Error('Failed to generate token')
    }
   }



module.exports = mongoose.model("User", userSchema);