
// Tommy Mannix 26/10/2024
      $(".addtocart").off().click(function(){
        event.preventDefault();
        event.stopImmediatePropagation();
console.log("fired")

var ref = $(this).closest(".flex.flexcolumn").find("p.bookid").text();
var name = $(this).closest(".flex.flexcolumn").find("h3.BookName").text();
var price = $(this).parent().find("p.price").text();
console.log("price is " + price)
        $.ajax({
           url: "/cart/addcart",
           type: "POST",
           contentType: "application/json",
           data: JSON.stringify(
            {ref:ref,
            name:name,
            price:price
          }
            ),
           success: function(res){
            console.log(res)
            $('#shoppingcart').html(res);
           },
           dataType:'html',
           error: e => console.log(e)
       });
       });


       $(".Checkout").off().click(function(){
        console.log("pressed")
        var url= "/cart/checkout"
       console.log(url)
       window.location.href = url
          
           })
     