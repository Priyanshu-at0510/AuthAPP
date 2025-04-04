//auth,isStudent,isAdmin

const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>{
    try {
        //extract JWT token
        //PENDING:other ways to fetch token
        console.log("body",req.body.token);
        console.log("cookie",req.cookies.token);
        // console.log("header",req.header("Authorization").replace("Bearer ",""));
        const token=req.body.token || req.cookie.token || req.header("Authorization").replace("Bearer ","");
        if(!token || token===undefined){
            return res.status(401).json({
                success:false,
                message:"Token Missing"
            });
        }
        //verify the token
        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload)

            req.user=payload; //req ke andar es payload ko store kar lenge
        }catch(err){
            console.log(err)
            return res.status(401).json({
                success:false,
                message:"Token is Invalid",
            })
        }
        next();
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"Something went wrong ,While verifying the token",

        })
    }
}

exports.isStudent=(req,res,next)=>{
    try {
        if(req.user.role !=="Student"){
           return res.status(401).json({
            success:false,
            message:"This is a protected route for students"
           })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User Role is not Matching",
        })
    }
}

exports.isAdmin=(req,res,next)=>{
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin"
               })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User Role is not Matching",
        })
    }
}
