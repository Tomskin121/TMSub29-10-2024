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
    
$('#subjectdropdown').change(function() {    
    var item=$(this);
    var index = item.val() - 1
    var keys = Object.keys(subjectlist[index])
       console.log("keys are these " + keys)
       for (var i = 0; i < columns.length; i++) {

        $("#" + columns[i].COLUMN_NAME).val(subjectlist[index][keys[i]])

    }



                });

