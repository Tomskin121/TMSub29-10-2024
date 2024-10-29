
    

      $("#LoginBut").off().click(function(){
        event.preventDefault();
        event.stopImmediatePropagation();



       var  user =  $("#UserName" ).val()
       var  Pw =  $("#Password" ).val()

       console.log(user)
       console.log(Pw)
     //   var ptag =$(this).children('p')[0]
       //  console.log($(ptag).text())
        $.ajax({
           url: "/login",
           type: "POST",
           contentType: "application/json",
           data: JSON.stringify({user: user,  Password: Pw }),
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