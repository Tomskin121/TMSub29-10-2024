const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule")
const { body, query, validationResult } = require("express-validator");

 

   

 
router.get('/', async(req, res) => {
 
  var userinfo = banner.bannercreds(req.session)

  console.log(userinfo)
        // gather the list of magainzes and store it in an array
const listEvents = await mysqlmodule.ListExpertTalks()
   res.render('Pages/ExpertTalk',{userinfo:userinfo,listEvents:listEvents});
    
 });


 
 
router.get('/info', [
  [
    // check the data passed is not empty, has numerica value, trimmed and escaped for SQL injection
    query("ref").notEmpty().isNumeric().trim().escape()
  ],
],
 async(req, res) => {
  // store any issues in the error constant
  const errors = validationResult(req);

// if there are any errors with the input return status 400 with the error array
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 

  var expertref = req.query.ref;

 
  var userinfo = banner.bannercreds(req.session)

  console.log(userinfo)
        // gather the list of magainzes and store it in an array
const EventList = await mysqlmodule.MoreInfoExpertTalks(expertref)
res.render('Pages/Expertinfo',{userinfo:userinfo,EventList:EventList});
    
 });


 router.post('/info/purchase', [
  [
    // check the data passed is not empty, has numerica value, trimmed and escaped for SQL injection
    body("ref").notEmpty().isNumeric().trim().escape(),
  ],
],
 async(req, res) => {
  // store any issues in the error constant
  const errors = validationResult(req);

// if there are any errors with the input return status 400 with the error array
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
var ref = req.body.ref

  console.log(ref)

  var userinfo = banner.bannercreds(req.session)
  
  
  const insert = await mysqlmodule.CreateExpertBooking(
    userinfo.userid,
   req.body.ref

  )
  res.json({redirectUrl:"/events/Confirmation"});
  
});
  module.exports = router