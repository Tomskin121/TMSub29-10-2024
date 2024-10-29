
    
$(".moreinfo").off().click(function(){
    console.log("pressed")
    var ref = $(this).closest(".width45.height30").find("p.courseRef").text();
    var url= "/ExpertEvents/info?ref=" + encodeURIComponent(ref.trim())
   console.log(url)
   window.location.href = url
      
       })
 
 



 $("#BookExpertTalk").off().click(function(){
                event.preventDefault();
                event.stopImmediatePropagation();
         
                $.ajax({
                   url: "/ExpertEvents/info/purchase",
                   type: "POST",
                   contentType: "application/json",
                   data: JSON.stringify({
            
                    ref: $("#ref").text().trim(),
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