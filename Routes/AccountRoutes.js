const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule");
const hashing = require("../Models/Hashing")
const { body } = require("express-validator");


 

 router.get('/', async(req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")


  const isloggedin = req.session.logged_in
  if(isloggedin){

  
  var userinfo = banner.bannercreds(req.session)

        // gather the list of books and store it in an array

   res.render('Pages/Accountmenu',{userinfo:userinfo});
  }
  else{
    res.redirect("/login")
  }
    
 });


 
 router.get('/ViewAccount', async(req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")


  const isloggedin = req.session.logged_in
  if(isloggedin){

  

  var userinfo = banner.bannercreds(req.session)
var customerdata = await mysqlmodule.getCustomerData(userinfo.userid)
        // gather the list of books and store it in an array
console.log(customerdata)
   res.render('Pages/AdminEdit',{userinfo:userinfo,customerdata:customerdata});
  }
  else{
    res.redirect("/login")
  }
    
 });




 
 router.get('/ViewMagazineOrders', async(req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")


  const isloggedin = req.session.logged_in
  if(isloggedin){
  var userinfo = banner.bannercreds(req.session)
var orderlist = await mysqlmodule.subscriptiondetailsindividual(userinfo.userid)
        // gather the list of books and store it in an array
console.log(orderlist)
   res.render('Pages/MagazineOrders',{userinfo:userinfo,orderlist:orderlist});
  }
  else{
    res.redirect("/login")
  }
    
 });


 
 router.post('/ViewAccount', async(req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")

  console.log("passed")
  const isloggedin = req.session.logged_in
  if(isloggedin){


  var userinfo = banner.bannercreds(req.session)
var customerdataupdate = await mysqlmodule.callUpdateCustomer(req.body.first, req.body.second, req.body.add1,
   req.body.add2, req.body.postcode, req.body.home, req.body.mobile, req.body.email.trim(),userinfo.userid)

  var customerdata = await mysqlmodule.getCustomerData(userinfo.userid)
        // gather the list of books and store it in an array

   res.render('Pages/AdminEdit',{userinfo:userinfo,customerdata:customerdata});
  }
  else{
    res.redirect("/login")
  }
    
 });


 

   
  module.exports = router