$("#newcontrols").hide();
$(".subjectdropdown").show();







$(".edititem").click(function()
{
    console.log("FIRING")
console.log($(".edititem:checked").val())
    

    if($(this).val() == "1") {
        $(".subjectdropdown").show();
        $("#newcontrols").hide();
        $("#updatecontrols").show();
        clear()
      
    };

    if($(this).val() == "2") {
        $(".subjectdropdown").hide();
        $("#newcontrols").show();
        $("#updatecontrols").hide();
        clear()
    };


});


function clear() {
   
    columns.forEach((val) => {

            console.log("key is " + val.COLUMN_NAME)
            $("#" + val.COLUMN_NAME).val("")
    })
                
                }
    
$("#clear").click(function()
                {
                clear()
                })
    
$('#Author_ID').change(function() {    
                   
                        console.log($('#Author_ID').val())
              
                
                    
                
                
                
                                });
                


$('#subjectdropdown').change(function() {    
    
    console.log(subjectlist)
    var item=$(this);
    var index = item.val()
    console.log(index)
    var keys = Object.keys(subjectlist[0])
    console.log
       console.log("keys are these " + keys)
       for (var i = 0; i < columns.length; i++) {

   
        $("#" + columns[i].COLUMN_NAME).val(subjectlist[index - 1][keys[i]])

    }



                });

