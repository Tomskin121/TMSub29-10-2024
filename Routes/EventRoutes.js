const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule")


 

   

 
router.get('/', async(req, res) => {
 
  var userinfo = banner.bannercreds(req.session)

  console.log(userinfo)
        // gather the list of magainzes and store it in an array
//const EventList = await mysqlmodule.ListCourses()
   res.render('Pages/Events',{userinfo:userinfo});
    
 });


 router.get('/confirmation', async(req, res) => {
 
  var userinfo = banner.bannercreds(req.session)

  console.log(userinfo)
        // gather the list of magainzes and store it in an array
//const EventList = await mysqlmodule.ListCourses()
   res.render('Pages/Confirmation',{userinfo:userinfo});
    
 });


  module.exports = router