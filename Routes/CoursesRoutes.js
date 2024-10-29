const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule")
const { body, query, validationResult } = require("express-validator");

 

   
 // Tommy Mannix 26/10/2024
router.get('/', async(req, res) => {
 
  var userinfo = banner.bannercreds(req.session)

  console.log(userinfo)
        // gather the list of courses and store it in an array
const EventList = await mysqlmodule.ListCourses()
   res.render('Pages/Courses',{userinfo:userinfo,EventList:EventList});
    
 });

 router.get('/info', [
  [
    // check the data passed is not empty, has numerica value, trimmed and escaped for SQL injection
    query("ref").notEmpty().isNumeric().trim().escape() // use escape to sanitise any inputs
  
  ],
],
 async(req, res) => {
  // store any issues in the error constant
  const errors = validationResult(req);

// if there are any errors with the input return status 400 with the error array
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 

  var passedvalue = req.query.ref;
  console.log(passedvalue)
  var userinfo = banner.bannercreds(req.session)
        // gather the list of magainzes and store it in an array
const EventList = await mysqlmodule.moreinfoCourses(passedvalue)
console.log(EventList)


  res.render('Pages/Courseinfo',{userinfo:userinfo,EventList:EventList});
    
 });



 router.get('/info/purchase', [
  [
    // check the data passed is not empty, has numerica value, trimmed and escaped for SQL injection
    query("ref").notEmpty().isNumeric().trim().escape(),
    query("Q1").notEmpty().isNumeric().trim().escape(),
    query("Q2").notEmpty().isNumeric().trim().escape(),
    query("Q3").notEmpty().isNumeric().trim().escape() // use escape to sanitise any inputs
   
  ],
],
 async(req, res) => {
  // store any issues in the error constant
  const errors = validationResult(req);

// if there are any errors with the input return status 400 with the error array
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 

  var CourseRef = req.query.ref;
  var ChildQuantity = req.query.Q1;
  var AdultQuantity = req.query.Q2;
  var ConcessionQuantity = req.query.Q3;

  //console.log(passedvalue)
  var userinfo = banner.bannercreds(req.session)
        // gather the list of magainzes and store it in an array

        const shippinglist = await mysqlmodule.GetCustomerBilling(userinfo.userid)
        console.log(shippinglist)
const EventList = await mysqlmodule.moreinfoCourses(CourseRef)
console.log(EventList)


  res.render('Pages/Purchase_course',{userinfo:userinfo,EventList:EventList,ChildQuantity,AdultQuantity,ConcessionQuantity,shippinglist:shippinglist});
 });



 router.post('/info/purchase', [
  [
    // check the data passed is not empty, has numerica value, trimmed and escaped for SQL injection
    body("InBillingID").notEmpty().isNumeric().trim().escape(),
    body("NameonCard").trim().escape(),
    body("cardnumber").trim().escape(), // use escape to sanitise any inputs
    body("CVV").trim().escape(),
    body("Childquant").notEmpty().trim().escape(),
    body("adultQuant").notEmpty().trim().escape(),
    body("concessionQuant").notEmpty().trim().escape(),
    body("courseInstance").notEmpty().trim().escape(),


  ],
],
 async(req, res) => {
  // store any issues in the error constant
  const errors = validationResult(req);

// if there are any errors with the input return status 400 with the error array
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  var userinfo = banner.bannercreds(req.session)
  const insert = await mysqlmodule.callInsertCustomerCourseBooking(
    userinfo.userid,
    req.body.InBillingID,
    req.body.NameonCard,
    req.body.cardnumber,
    req.body.CVV,
    req.body.Childquant,
req.body.adultQuant,
req.body.concessionQuant,
req.body.courseInstance

  )
  res.json({redirectUrl:"/events/Confirmation"});
  

/*
  var CourseRef = req.query.ref;
  var ChildQuantity = req.query.Q1;
  var AdultQuantity = req.query.Q2;
  var ConcessionQuantity = req.query.Q3;

  //console.log(passedvalue)

        // gather the list of magainzes and store it in an array

        const shippinglist = await mysqlmodule.GetCustomerBilling(userinfo.userid)
        console.log(shippinglist)
const EventList = await mysqlmodule.moreinfoCourses(CourseRef)
console.log(EventList)

*/
//  res.render('Pages/Purchase_course',{userinfo:userinfo,EventList:EventList,ChildQuantity,AdultQuantity,ConcessionQuantity,shippinglist:shippinglist});
 });

  module.exports = router