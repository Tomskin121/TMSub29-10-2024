// This is the main module for the application 
// all items are private and only available in this module 


// store the railboard module in a object and reference it using require
// good practice declare as constant

// access the same as any object and pass data
//railboard.fetchinfo("SHF","40");
//var pageorder = ['http://127.0.0.1:8080/eventboard','http://127.0.0.1:8080/news','http://127.0.0.1:8080/digitalposter']
var railinformation ="";

var bodyParser = require('body-parser')
// create the server
const http = require('http');
const session = require('express-session'); 
// allow file access and use from the server
const fs = require('fs');
// Frame work being used (Use NPM to install)
const express = require('express');
// Allows the use of CORS within the app (Use NPM to install)
const cors = require('cors');
// Security for the app headers (Use NPM to install)
const helmet = require("helmet")
const hashing = require("./Models/Hashing")
// set up express for the front facing app 
const app = express();

// make a link to the mySQL module to access SQL commands
const mysqlmodule = require('./Models/mySQLModule')
const SessionModule = require('./Models/session')


const loginroutes = require("./Routes/LoginRoutes")
const BookRoutes = require("./Routes/BookRoutes")
const MagazineRoutes = require("./Routes/MagazineRoutes")
const HomeRoutes = require("./Routes/HomeRoutes")
const CoursesRoutes= require("./Routes/CoursesRoutes")
const EventRoutes= require("./Routes/EventRoutes")
const ExpertEventRoutes= require("./Routes/ExpertTalkRoutes")
const geneologyEventRoutes= require("./Routes/GeneologyRoutes")
const SubscriptionRoutes= require("./Routes/SubPurchaseRoutes")
const Createroutes= require("./Routes/CreateLoginRoutes")

const Accountroutes = require("./Routes/AccountRoutes")
const cartroutes = require("./Routes/ShoppingCart")
const adminroutes = require("./Routes/AdminRoutes")
const HTMLPort = 8080;

app.use(bodyParser.urlencoded({ extended: false }))



app.use(bodyParser.json())




// enable the use of sessions 
app.use(session(SessionModule.sess));

// enable the use of routing using the Route files
app.use("/login", loginroutes)
app.use("/Books", BookRoutes)
app.use("/Magazines", MagazineRoutes)
app.use("/home", HomeRoutes)
app.use("/courses", CoursesRoutes)
app.use("/Events", EventRoutes)
app.use("/ExpertEvents", ExpertEventRoutes)
app.use("/geneaology", geneologyEventRoutes)
app.use("/subscribe", SubscriptionRoutes)
app.use("/CreateLogin", Createroutes)
app.use("/Account", Accountroutes)
app.use("/cart", cartroutes)
app.use("/admin",adminroutes)



//enable security for the web site
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
         
         defaultSrc: ["'self'" ,'http://127.0.0.1:8080/', 'http://127.0.0.1:3030/'],
         "img-src": ["'self'", "https: data: blob:"],
   
         // if  these are what will allow conenctions to the web server via Javascript, if using localhost include
         // 127.0.0.1:PORT AND localhost:PORT  
         connectSrc: ["'self'", 'http://127.0.0.1:8080/', 'http://127.0.0.1:3030/','http://localhost:3030/','http://localhost:8080/'],
         styleSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'",'https://p.typekit.net/','https://use.typekit.net/' ,'http://127.0.0.1:8080/', 'http://127.0.0.1:3030/','http://localhost:3030/','http://localhost:8080/'],
         baseUri: ["'self'"],
        fontSrc: ["'self'", 'http://127.0.0.1:8080/','https://use.typekit.net/' ,'http://127.0.0.1:3030/','http://localhost:3030/','http://localhost:8080/'],
         scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'http://127.0.0.1:8080/', 'http://127.0.0.1:3030/','http://localhost:3030/','http://localhost:8080/','https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'],
        
        }
      }
    }));

// set the static path, these are publicly available and use the files stored in the public folder 
// it will automatically push
//  /css
//  /js
//  /assets
// and anything in the rool /public 
app.use(express.static('public'));
//app.use(express.static(__dirname + "/public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

// allow only from certain URLS requests within the CORS requests 

app.use(
    cors({origin: [
        'http://localhost:8080', 
        'http://127.0.0.1:8080']})
  );
  

console.log("Server starting")
// this shows the index page on the chosen web port if no extensions are given
 app.get('/', async(req, res) => {
// render the index screen with the logo and the duration list 
res.redirect("/home")
  //  res.render('Pages/Index');
  });
  



  app.listen(HTMLPort);

