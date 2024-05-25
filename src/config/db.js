const mongoose = require("mongoose")

const mondbUrl="mongodb+srv://ayukumar242004:Ayush_kumar242004@cluster0.tlfiwdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
    return mongoose.connect(mondbUrl);
}
module.exports={connectDb}