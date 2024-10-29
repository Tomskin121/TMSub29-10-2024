const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const hashing = require("../Models/Hashing")
const session = require('express-session');

router.post('/',  async(req, res) =>{
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
  console.log("HASH IS " + await hashing.generatehash(req.body.Password))
  
  try {
    var comparison = await hashing.comparehash(req.body.Password.trim(),req.body.user.trim())
console.log(comparison)
 
  if(comparison[0] == true)  {
 
    req.session.logged_in = true;
    req.session.user = comparison[1] 
    req.session.level = comparison[2]
    req.session.userid = comparison[3]
    req.session.cart = []

console.log("MATCH")
  res.status(200).send({result: 'redirect', url:'/home'});
}
else{
  console.log("NOT MATCH")
 //res.redirect('/login')
  res.status(200).send({result: 'redirect', url:'/login'});
}

//res.redirect('/admin')
  }

  catch(err){
console.log(err)
  //  res.redirect('/login')
    res.status(200).send({result: 'redirect', url:'/login'});
  }
});



router.get('/', async(req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")


  const isloggedin = req.session.logged_in;
 
  var userinfo = banner.bannercreds(req.session)


      if (!isloggedin){

        
  
   res.render('Pages/AdminLogin',{userinfo:userinfo});
     
  }
   else{
  res.redirect('/admin')
  }
 
 });


 

   
  module.exports = router