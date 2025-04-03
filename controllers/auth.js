const bcrypt=require("bcrypt");
const User=require("../models/user");

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
        const user=await User.create({
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

