const express=require("express");
const router=express.Router();


//import the route handler
const {login,signup}=require("../controllers/auth");
const {auth,isStudent,isAdmin}=require("../middlewares/auth");
//map the path 

router.post("/login",login);
router.post("/signup",signup);

//testing protected route for single middleware
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route of Tests",
    });
});
//protected route
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route of students",
    });
});

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route of Admin"
    });
});


module.exports=router;

