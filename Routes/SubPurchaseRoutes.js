const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule")
var bodyParser = require("body-parser");
const { body, query, validationResult } = require("express-validator");
 
// Express.js middleware to use JSON objects
router.use(express.json());

 router.post('/', 
 // Add the validator for string sanitisation 
 [
  [
    // check the data passed is not empty, has numerica value, trimmed and escaped for SQL injection
    body("Magazine").notEmpty().isNumeric().trim().escape() // use escape to sanitise any inputs
   
  ],
],
 async(req, res) => {
  // store any issues in the error constant
  const errors = validationResult(req);

// if there are any errors with the input return status 400 with the error array
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // else continue onwards
  const isloggedin = req.session.logged_in
  const magazineinfo = req.body.Magazine
  console.log(isloggedin)
console.log("FIRED")
  if(isloggedin){
    console.log("User logged in")
  
    

   //res.render('Pages/Purchase_Sub',{userinfo:userinfo});
var string = encodeURIComponent(magazineinfo)
   res.json({redirectUrl:"/subscribe?Magazine=" + string});
  }

  else
  {
  
 res.redirect("/subscribe/redirectlogin")
  //  res.redirect("/login")
  }

 });


 router.get('/redirectlogin', async(req, res) => {
  
  console.log("Get")
  var redirect = ({redirectUrl:"/login"})
  res.json({redirectUrl:"/login"});
 });


// this route will handle sending the Subscription purchase window for the system 
 router.get('/', 
 // Add the validator for string sanitisation 
 [
  [
    // check the data passed is not empty, has numerica value, trimmed and escaped for SQL injection
    query("Magazine").notEmpty().isNumeric().trim().escape() // use escape to sanitise any inputs
   
  ],
],


async(req, res) => {
// store any issues in the error constant
const errors = validationResult(req);
// if there are any errors with the input return status 400 with the error array
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
var passedvalue = req.query.Magazine;
console.log("Get")
var userinfo = banner.bannercreds(req.session)
  var subscriptioninfo = await mysqlmodule.Subscribeget(passedvalue)
var  billinglist = await mysqlmodule.GetCustomerBilling(userinfo.userid)
var  shippinglist = await mysqlmodule.GetCustomerShipping(userinfo.userid)
  console.log(billinglist)
    var userinfo = banner.bannercreds(req.session)

    res.render('Pages/Purchase_Sub',{userinfo:userinfo,subscriptioninfo:subscriptioninfo,shippinglist:shippinglist,billinglist:billinglist});
 });



 router.post('/purchase', // Add the validator for string sanitisation 
 [
  [
    // check the data passed is not empty, has numerica value, trimmed and escaped for SQL injection
    body("magazineid").notEmpty().isNumeric().trim().escape(), // use escape to sanitise any inputs
    body("subscriptionmethod").notEmpty().isNumeric().trim().escape(),
    body("deliveryMethodid").notEmpty().isNumeric().trim().escape(),
    body("deliveryAddressid").trim().escape(),
    body("newdeliverydetails.FirstName").trim().escape(),
    body("newdeliverydetails.Address1").trim().escape(),
    body("newdeliverydetails.Address2").trim().escape(),
    body("newdeliverydetails.postcode").trim().escape(),
    body("billingmethodid").trim().escape(),
    body("newbillingmethod.Cardname").trim().escape(),
    body("newbillingmethod.CardNumber").trim().escape(),
    body("newbillingmethod.CardCVV").trim().escape(),
  ],
],
 // Add the validator for string sanitisation 
 
 async(req, res) => {
  // store any issues in the error constant
  const errors = validationResult(req);
  // if there are any errors with the input return status 400 with the error array
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

// if there are any errors with the input return status 400 with the error array


  // else continue onwards

  const isloggedin = req.session.logged_in
  if(isloggedin){
    console.log("User logged in")
    console.log(req.body)
    var userinfo = banner.bannercreds(req.session)



var billingid
if(req.body.billingmethodid = "")
{
  billingid = null
}
else
{
  billingid  =req.body.billingmethodid
}

var Addressid
if(req.body.deliveryAddressid = "")
{
  Addressid = null
}
else
{
  Addressid  =req.body.deliveryAddressid
}
  

    var insert = await mysqlmodule.callsubscriptioninsert(
      req.body.magazineid,
      req.body.subscriptionmethod,
      req.body.deliveryMethodid,
      Addressid,
      req.body.newdeliverydetails.FirstName,
      req.body.newdeliverydetails.SecondName,
      req.body.newdeliverydetails.Address1,
      req.body.newdeliverydetails.Address2,
      req.body.newdeliverydetails.postcode,
      billingid,
      req.body.newbillingmethod.Cardname,
      req.body.newbillingmethod.CardNumber,
      req.body.newbillingmethod.CardCVV,
      userinfo.userid
    )

console.log(insert)

console.log(insert[0][0].Subscription_ID)
var string = encodeURIComponent(insert[0][0].Subscription_ID)
res.json({redirectUrl:"/subscribe/confirmation?subscription=" + string});
  }
/*
var string = encodeURIComponent(magazineinfo)
   res.json({redirectUrl:"/subscribe?Magazine=" + string});
  }

  else
  {
  
 res.redirect("/subscribe/redirectlogin")
  //  res.redirect("/login")
  }
*/
 });



 router.get('/confirmation', async(req, res) => {
  var passedvalue = req.query.subscription;

  const isloggedin = req.session.logged_in
  console.log("logged in" + isloggedin)
  if(isloggedin){
  console.log(passedvalue)
  var userinfo = banner.bannercreds(req.session)
  var subscriptioninfo = await mysqlmodule.subscriptiondetails(passedvalue)
  console.log("Get")
  console.log(userinfo.userid )
  console.log(subscriptioninfo.CustomerID)
  if(userinfo.userid = subscriptioninfo[0].CustomerID){
  res.render('Pages/orderconfimation',{userinfo:userinfo,subscriptioninfo:subscriptioninfo[0]});
}
else{
  res.redirect("/magazines")
}
}
else{
  res.redirect("/magazines")
}

 });


  module.exports = router





