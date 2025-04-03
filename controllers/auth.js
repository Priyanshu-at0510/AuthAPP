const bcrypt=require("bcrypt");
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const { options } = require("../routes/user");

require("dotenv").config();

//route handler for signup
exports.signup=async (req,res)=>{
    try {
        //fetch the data from req. body
        const {name,email,password,role}=req.body;
        //check if user already exists
        const existingUser=await User.findOne({email});
         
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exist"
            });
        }
        //password secure
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in Hashing Password"
        
            });
        }

        //create entry for user
        let user=await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });

        res.status(200).json({
            success:true,
            message:"user created successfully",
            user
        })
    } catch (error) {
        console.error(error);
        console.log(error);
        return res.status(500).json({
           success:false,
           message:"User cannot be registered , please try again later"
        })
        
    }
}

exports.login=async (req,res)=>{
     try {
        //fetch the data from req body
        const {email,password}=req.body;
        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please Fill All The Details Carefully"
            })
        }
        //check if user exists
        const user=await User.findOne({email});
        //if not registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered,Please SignUp first"
            })
        }
        const payload={
            email:user.email,
            id:user._id,
            role:user.role

        }
        //verfiy password and generate a JWT token
        if(bcrypt.compare(password,user.password)){
            //password matched
            let token=jwt.sign(payload,
                               process.env.JWT_SECRET,
                               {
                                expiresIn:"2h"
                               });

            user.token=token;
            
            user.password=undefined;
            
            //now create a cookie
            const options={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true //now access at client side
            }
            res.cookie("PriyanshuCookie",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"user logged in successfully"
            })
        }
        else{
            //password do not matched
            return res.status(403).json({
                success:false,
                message:"Password is Incorrect"
            });
        }

     } catch (error) { 
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure"
        });
     }
}
 