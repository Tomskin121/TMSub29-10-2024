$(".noaddress").hide();
$(".prevaddress").hide();
$(".newpayment").hide();
$(".existingPayment").hide();




$(".Deliveryaddress").click(function()
{
    console.log("FIRING")
console.log($(".Deliveryaddress:checked").val())
    

    if($(this).val() == "1") {
        $(".previousaddresses").show();
        $(".noaddress").hide();
        $(".prevaddress").hide();

      
    };

    if($(this).val() == "2") {
        $(".noaddress").show();
        $(".previousaddresses").hide();
    };


});


$(".PaymentMethod").click(function()
{
    console.log("FIRING")
console.log($(".PaymentMethod:checked").val())
    

    if($(this).val() == "1") {
        $(".previouspaymentitems").show();
        $(".newpayment").hide();
        $(".existingPayment").hide();

      
    };

    if($(this).val() == "2") {
        $(".newpayment").show();
        $(".existingPayment").hide();
    };


});



// Tommy Mannix 26/10/2024
$("#Purchase").off().click(function(){
    event.preventDefault();
    event.stopImmediatePropagation();
var deliveryAddressid =  $("#DeliveryAddressDropDown").val()
var newdeliverydetails = ({
    FirstName: $("#NewFirstName").val(),
    SecondName: $("#NewSecondName").val(),
    Address1: $("#address1").val(),
    Address2: $("#address2").val(),
    postcode: $("#postcode").val(),
})
var billingmethodid  = $("#BillingDropDown").val()
var newbillingmethod = ({
    Cardname:  $("#cardname").val(),
    CardNumber: $("#cardnumber").val(),
    CardCVV: $("#cardCVV").val()
    })
    $.ajax({
       url: "/cart/checkout",
       type: "POST",
       contentType: "application/json",
       data: JSON.stringify({
          deliveryAddressid:deliveryAddressid,
          newdeliverydetails:newdeliverydetails,
          billingmethodid,billingmethodid,
          newbillingmethod,newbillingmethod
         }),
       success: function(res){
        console.log("Complete")
        if(res.redirectUrl) {
            window.location.href = res.redirectUrl;
        }
       },
       dataType:'json',
       error: e => console.log(e)
   });
   });