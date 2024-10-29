function generatejson(){
    var values = []
  
   
       for (var i = 0; i < columns.length; i++) {
var field = columns[i].COLUMN_NAME;
  var row =  $("#" + columns[i].COLUMN_NAME).val()

  var item = { field : row}
values.push(item)

    }


}
// Tommy Mannix 26/10/2024
$("#insert").off().click(function(){
    event.preventDefault();
    event.stopImmediatePropagation();
    
   // create empty array to store the values
   var values = []

   // dynamically create the JSON string using the values that have been entered
      for (var i = 0; i < columns.length; i++) {
var field = columns[i].COLUMN_NAME;
 var row =  $("#" + columns[i].COLUMN_NAME).val()

 var item = {};
 item[field] = row;
values.push(item)
      }
      
      
var mergedObject = {};
      
for (var i = 0; i < values.length; i++) {
          Object.assign(mergedObject, values[i]);
}


    $.ajax({
       url: route + "/insert",
       type: "POST",
       contentType: "application/json",
       data: JSON.stringify({
        mergedObject
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


   // Tommy Mannix 26/10/2024
$("#delete").off().click(function(){
    event.preventDefault();
    event.stopImmediatePropagation();
    
    
   // create empty array to store the values
   var values = []

   // dynamically create the JSON string using the values that have been entered
      for (var i = 0; i < columns.length; i++) {
var field = columns[i].COLUMN_NAME;
 var row =  $("#" + columns[i].COLUMN_NAME).val()

 var item = {};
 item[field] = row;
values.push(item)
      }
      
      
var mergedObject = {};
      
for (var i = 0; i < values.length; i++) {
          Object.assign(mergedObject, values[i]);
}
console.log("mergedObject" )   
console.log(mergedObject)

    $.ajax({
       url: route + "/delete",
       type: "POST",
       contentType: "application/json",
       data: JSON.stringify({
        mergedObject
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


   // Tommy Mannix 26/10/2024
$("#update").off().click(function(){
    event.preventDefault();
    event.stopImmediatePropagation();
    
    // create empty array to store the values
    var values = []

    // dynamically create the JSON string using the values that have been entered
       for (var i = 0; i < columns.length; i++) {
var field = columns[i].COLUMN_NAME;
  var row =  $("#" + columns[i].COLUMN_NAME).val()

  var item = {};
  item[field] = row;
values.push(item)
       }
       
       
var mergedObject = {};
       
for (var i = 0; i < values.length; i++) {
           Object.assign(mergedObject, values[i]);
}
console.log("mergedObject" )   
console.log(mergedObject)
   
       $.ajax({
       url: route + "/update",
       type: "POST",
       contentType: "application/json",
       data: JSON.stringify({
        mergedObject
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