
function bannercreds(request){
var userinfo
const isloggedin = request.logged_in;
if(isloggedin){
    userinfo = ({
     isloggedin: true,
       user:request.user,
       userlevel:request.level,
       userid:request.userid,
       cart:request.cart
      });
      return userinfo
     }
     
     
     else{
       userinfo = ({
         isloggedin: false,
           user:"",
           userlevel:"Guest",
           userid:"unknown",
           cart:"none"
          });
          return userinfo
     }
    
    }

    module.exports = {bannercreds}