const express = require("express");
const router=express.Router()
const { mail, signup } = require("../controller/mailController");


router.get("/sendmail", mail);
router.post("/user/signup", signup);

module.exports=router
