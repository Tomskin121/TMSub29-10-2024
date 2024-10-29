const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule")


 

   

 // Tommy mannix 26/10/2024
 router.get('/', async(req, res) => {
 
  var userinfo = banner.bannercreds(req.session)

  console.log(userinfo)
        // gather the list of magainzes and store it in an array
const Magazinelists = await mysqlmodule.ListMagazines()
   res.render('Pages/Magazines',{userinfo:userinfo,Magazinelist:Magazinelists});
    
 });

  module.exports = router