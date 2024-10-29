
    

     function onSubscribe(MagazineID){
    
console.log(MagazineID)

try{


        $.ajax({
           url: "/subscribe",
           type: "POST",
           contentType: "application/json",
           data: JSON.stringify({Magazine: MagazineID}),
           dataType:'json',
           success: function(res){
            console.log("Complete")

            console.log(res)
            if(res.redirectUrl) {
              window.location.href = res.redirectUrl;
          }
      
           },
           
           error:function(err){
          
            console.log(err)
           }
       });
       
      }
      catch(err)
      {
        console.log(err)
      }
       
     
       };