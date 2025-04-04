const express=require("express");
const app=express();

require("dotenv").config();
const PORT=process.env.PORT || 4000; 

//cookie-parser 
const cookieParser=require("cookie-parser");
app.use(cookieParser());

//middleware for parsing
app.use(express.json());

require("./config/database").dbConnect();

//route import and mount
const user=require("./routes/user");
app.use("/api/v1",user);

//start the server
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
});

//default route
app.get("/",(req,res)=>{
    res.send("<h1>this is default route baby</h1>");
})
