
    

      $("#updateaccount").off().click(function(){
        event.preventDefault();
        event.stopImmediatePropagation();
var first = $("#FirstName" ).val();
var second = $("#Surname" ).val();
var add1 = $("#Address1" ).val();
var add2 = $("#Address2" ).val();
var postcode = $("#Postcode" ).val();
var home = $("#homePhone" ).val();
var mobile = $("#MobilePhone" ).val();
var  email =  $("#Email" ).val()

console.log("fired")
  
     //   var ptag =$(this).children('p')[0]
       //  console.log($(ptag).text())
        $.ajax({
           url: "/account/ViewAccount",
           type: "POST",
           contentType: "application/json",
           data: JSON.stringify({first:first ,second:second,add1:add1,add2:add2,
            postcode:postcode, home:home,mobile:mobile, email:email }),

           success: function(res){
            console.log("Complete")
           if (res.result == 'redirect') {
             // redirecting to main page from here.
              window.location.replace(res.url);
            }
           },
           dataType:'json',
           error: e => console.log(e)
       });
       
       
       
       
       });