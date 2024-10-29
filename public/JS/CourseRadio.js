
$(".newpayment").hide();
$(".previouspaymentitems").show()



$(".PaymentMethod").click(function()
{
    console.log("FIRING")
console.log($(".PaymentMethod:checked").val())
    

    if($(this).val() == "1") {
      
        $(".newpayment").hide();
        $(".previouspaymentitems").show()
        clear()

      
    };

    if($(this).val() == "2") {
        $(".newpayment").show();
        clear()
        $(".previouspaymentitems").hide()
    };


});

function clear(){
     $("#cardname").val(""),
  $("#cardnumber").val(""),
   $("#cardCVV").val()
}





$("#bookingsubmit").off().click(function(){
    event.preventDefault();
    event.stopImmediatePropagation();

    $.ajax({
       url: "/courses/info/purchase",
       type: "POST",
       contentType: "application/json",
       data: JSON.stringify({

    InBillingID:$("#BillingDropDown").val(),
    NameonCard: $("#cardname").val(),
    cardnumber:$("#cardnumber").val(),
    CVV:$("#cardCVV").val(),
    Childquant: childtotal.trim(),
    adultQuant: Adulttotal.trim(),
    concessionQuant:concessiontotal.trim(),
    courseInstance:courseref.trim()
 
         }),
         dataType:'json',
       success: function(res){
        console.log("Complete")
        if(res.redirectUrl) {
            window.location.href = res.redirectUrl;
        }
       },
   
       error: e => console.log(e)
   });
   
   
   
   
   });