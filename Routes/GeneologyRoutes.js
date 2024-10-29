const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule")


 

   

 // Tommy Mannix 26/10/2024
 router.get('/', async(req, res) => {
 
  var userinfo = banner.bannercreds(req.session)

  console.log(userinfo)
        // gather the list of magainzes and store it in an array
const GeneologySubjects = await mysqlmodule.ListGeneaology()
const meetmethods = await mysqlmodule.MeetingMethods()
   res.render('Pages/Geneology',{userinfo:userinfo,GeneologySubjects:GeneologySubjects,meetmethods:meetmethods});
    
 });

  module.exports = router