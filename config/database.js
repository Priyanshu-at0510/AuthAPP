const mongoose=require("mongoose");

require("dotenv").config();
exports.dbConnect= ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("DB connected successful")})
    .catch((error)=>{
        console.log("DB Facing connection issues");
        console.log(error);
        process.exit(1);

    })
}