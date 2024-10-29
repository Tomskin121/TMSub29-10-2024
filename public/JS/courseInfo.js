
    
$(".courseinfo").off().click(function(){
   console.log("pressed")
   var ref = $(this).closest(".width45.height30").find("p.courseRef").text();
   var url= "/courses/info?ref=" + encodeURIComponent(ref.trim())
  console.log(url)
  window.location.href = url
     
      })


$(".BookCourse").off().click(function(){
       
var q1  =$("#childQuantity").val()
var q2  =$("#AdultQuantity").val()
var q3  =$("#ConcessionQuantity").val()


        var ref = $("#ref").text();
        console.log (q1 + "|" + q2+ "|" + q3)
        var url= "/courses/info/purchase?ref=" + encodeURIComponent(ref.trim()) + "&Q1=" + encodeURIComponent(q1.trim()) + "&Q2=" + encodeURIComponent(q2.trim()) + "&Q3=" + encodeURIComponent(q3.trim())
     console.log(url)
       window.location.href = url
          
           })