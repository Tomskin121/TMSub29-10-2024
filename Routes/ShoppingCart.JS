const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule")
const body_parser = require('body-parser');




   

 
 router.get('/', async(req, res) => {

	//console.log("cart data")
	//console.log(req.session)

	var userdata = banner.bannercreds(req.session)
var cartlist = req.session.cart

//	console.log(userdata)
    res.render("Partials/Shoppingcart", {userdata:userdata,cartlist:cartlist})
 });
// Tommy Mannix 26/10/2024
//Create Route for Add Item into Cart
router.post('/addcart', (req, res) => {

	const product_id = req.body.ref;
	const name = req.body.name
	const price = req.body.price
	let count = 0;
	if (!req.session.cart) {
		req.session.cart = [];
	}
var add = true
	for(let i = 0; i < req.session.cart.length; i++)
	{
		if(req.session.cart[i].product_id == product_id)
		{
			req.session.cart[i].quantity += 1;
			add = false
			count++;
		}
	}
	if(add == true)
	{
		const cart_data = {
			product_id : product_id,
			product_name : name,
			product_price : price,
			quantity : 1
		};
		req.session.cart.push(cart_data);
	}
	res.redirect("/cart")
});


// Tommy Mannix 26/10/2024
router.get('/checkout', async(req, res) => {

	//console.log("cart data")
//	console.log(req.session)
//
	var userinfo = banner.bannercreds(req.session)
var cartlist = req.session.cart
var  billinglist = await mysqlmodule.GetCustomerBilling(userinfo.userid)
var  shippinglist = await mysqlmodule.GetCustomerShipping(userinfo.userid)
//  console.log(billinglist)

    res.render("Pages/Purchase_Books", {userinfo:userinfo,cartlist:cartlist,shippinglist:shippinglist,billinglist:billinglist})
 });


 
 // Tommy Mannix 26/10/2024
 router.post('/checkout', async(req, res) => {
	const isloggedin = req.session.logged_in
	if(isloggedin){
	  console.log("User logged in")
	  console.log(req.body)
	  var userinfo = banner.bannercreds(req.session)
  var cart = JSON.stringify(req.session.cart);
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
	Addressid  = req.body.deliveryAddressid
  }
	  var insert = await mysqlmodule.callCreateBookOrder(
		Addressid,
		req.body.newdeliverydetails.FirstName,req.body.newdeliverydetails.SecondName,req.body.newdeliverydetails.Address1,
		req.body.newdeliverydetails.Address2,req.body.newdeliverydetails.postcode,billingid,req.body.newbillingmethod.Cardname,
		req.body.newbillingmethod.CardNumber,req.body.newbillingmethod.CardCVV,userinfo.userid,cart
	  )
req.session.cart = [];
  res.json({redirectUrl:"/events/Confirmation"});
}
 });

  module.exports = router