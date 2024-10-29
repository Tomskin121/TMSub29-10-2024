const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule")
//Tommy Mannix 26/10/2024
 router.get('/', async(req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
  const booklist = await mysqlmodule.Listbooks()
  var cartlist 
  const isloggedin = req.session.isloggedin
if(isloggedin )
{
  if(req.session.cart.length == 0)
  {
    cartlist = []
  }
  else{
    cartlist = req.session.cart
  }
}
else{
 cartlist = []
}
console.log(req.session)
  var userinfo = banner.bannercreds(req.session)

  console.log(userinfo)
  res.render('Pages/Books',{userinfo:userinfo,booklist:booklist,cartlist:cartlist});
    
 });

  module.exports = router