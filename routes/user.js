const express=require("express");
const router=express.Router();


//import the route handler
const {login,signup}=require("../controllers/auth");
//map the path 

// router.post("/login",login);
router.post("/signup",signup);


module.exports=router;

