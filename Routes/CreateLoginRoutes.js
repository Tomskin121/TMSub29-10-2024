const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule");
const hashing = require("../Models/Hashing")
const { body } = require("express-validator");


 

 router.get('/', async(req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")


 
  var userinfo = banner.bannercreds(req.session)

        // gather the list of books and store it in an array

   res.render('Pages/AdminCreateLogin',{userinfo:userinfo});
    
 });


 

 router.post('/', async(req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
  var userinfo = banner.bannercreds(req.session)


  var hashed = await hashing.generatehash( req.body.Password.trim())
console.log(req.body)
  var insert = await mysqlmodule.callinsertCustomer(
    req.body.first,   req.body.second, req.body.add1, req.body.add2, req.body.postcode, req.body.home, req.body.mobile,
    req.body.email.trim(),
    hashed
  )

  if(insert){
    console.log("success")
    res.redirect("/login")
  }
        // gather the list of books and store it in an array
else{
  console.log("fail")
  res.render('Pages/AdminCreateLogin',{userinfo:userinfo});
}
 
    
 });
   
  module.exports = router