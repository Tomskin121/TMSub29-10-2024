const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule")


 

 router.get('/', async(req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")


 
  var userinfo = banner.bannercreds(req.session)



        // gather the list of books and store it in an array

   res.render('Pages/index',{userinfo:userinfo});
    
 });
   
  module.exports = router