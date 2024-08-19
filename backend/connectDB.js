var mongoose = require('mongoose');

var dotenv =  require('dotenv')
dotenv.config()

mongoose.set("strictQuery")

async function connectDB(){
    try {
     await mongoose.connect(process.env.MONGO_CONNECT)
         console.log("db connected....")
    } catch (error) {
     console.log(error)
    }
 
 }
 
 module.exports = connectDB