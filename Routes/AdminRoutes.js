const express = require("express");
const router =  express.Router();
const banner = require("../Models/BannerContainer")
const mysqlmodule = require("../Models/mySQLModule")
var bodyParser = require("body-parser");
const { body, query, validationResult } = require("express-validator");
 
// Express.js middleware to use JSON objects
router.use(express.json());

router.get('/', async(req, res) => {

var userinfo = banner.bannercreds(req.session)

  res.render("Pages/Adminmenu",{userinfo:userinfo})


});

  




    router.get('/Books/AuthorAdmin', async(req, res) => {

      var userinfo = banner.bannercreds(req.session)
      var columnnames = await mysqlmodule.GetAuthorColumns()
      var subject = "author"
      var authorlist = await mysqlmodule.GetAuthorList();
      routevar = "/admin/Books/AuthorAdmin"
        res.render("Pages/Authors",{userinfo:userinfo,subjectlist:authorlist,subject:subject,columns:columnnames,routevar:routevar})
      
      
      });

     
// Tommy Mannix 27/10/2024 
/////////////Authors Routes ///////////////////////////////////////
// Insert Author route
        router.post('/Books/AuthorAdmin/insert', async(req, res) => {
var passedvalues = req.body.mergedObject
var insert = await mysqlmodule.callcreateauthor(passedvalues.Book_Author_FirstName,passedvalues.Book_Author_SurName)
res.json({redirectUrl:"/admin/Books/AuthorAdmin"});
          
    
          });
//  Update route
router.post('/Books/AuthorAdmin/update', async(req, res) => {
  console.log("im updating")
var passedvalues = req.body.mergedObject
console.log(passedvalues)
var update = await mysqlmodule.callupdateauthor(passedvalues.Book_Author_FirstName,passedvalues.Book_Author_SurName,passedvalues.Author_ID)
res.json({redirectUrl:"/admin/Books/AuthorAdmin"});
                      
                      });
//  Update Delete Route
 router.post('/Books/AuthorAdmin/delete', async(req, res) => {
  var passedvalues = req.body.mergedObject
  console.log(passedvalues)
  var update = await mysqlmodule.DeleteAuthor(passedvalues.Author_ID)
  res.json({redirectUrl:"/admin/Books/AuthorAdmin"});
});





// Tommy Mannix 27/10/2024 
/////////////Publishers Routes ///////////////////////////////////////
router.get('/Books/PublisherAdmin', async(req, res) => {
  var userinfo = banner.bannercreds(req.session)
  var columnnames = await mysqlmodule.GetPublisherColumns()
  var subject = "Publisher"
  var publisherlist = await mysqlmodule.GetPublishersList();
  routevar = "/admin/Books/PublisherAdmin"
    res.render("Pages/Authors",{userinfo:userinfo,subjectlist:publisherlist,subject:subject,columns:columnnames,routevar:routevar})
  
  });
// Insert  route
router.post('/Books/PublisherAdmin/insert', async(req, res) => {
  var passedvalues = req.body.mergedObject
  var insert = await mysqlmodule.CallCreatePublisher(passedvalues.Publisher_Name,passedvalues.Publisher_Address1,
    passedvalues.Publisher_Address2,passedvalues.Publisher_Postcode)
  res.json({redirectUrl:"/admin/Books/PublisherAdmin"});

            });
  //  Update route
  router.post('/Books/PublisherAdmin/update', async(req, res) => {
    console.log("im updating")
  var passedvalues = req.body.mergedObject
  console.log(passedvalues)
  var update = await mysqlmodule.CallUpdatePublisher(passedvalues.Publisher_Name,passedvalues.Publisher_Address1
    ,passedvalues.Publisher_Address2,passedvalues.Publisher_Postcode,passedvalues.Publisher_ID)
  res.json({redirectUrl:"/admin/Books/PublisherAdmin"});
                        
                        });
  //  Update Delete Route
   router.post('/Books/PublisherAdmin/delete', async(req, res) => {
    var passedvalues = req.body.mergedObject
    console.log(passedvalues)
    var Delete = await mysqlmodule.deletePublisher(passedvalues.Publisher_ID)
    res.json({redirectUrl:"/admin/Books/PublisherAdmin"});
  });
  
  
  
  


// Tommy Mannix 27/10/2024 
/////////////Sublength Routes ///////////////////////////////////////
router.get('/Magazines/sublengthAdmin', async(req, res) => {
  var userinfo = banner.bannercreds(req.session)
  var columnnames = await mysqlmodule.GetSublengthColumns()
  var subject = "Subscription Length"
  var publisherlist = await mysqlmodule.showSubLength();
  routevar = "/admin/Magazines/sublengthAdmin"
    res.render("Pages/Authors",{userinfo:userinfo,subjectlist:publisherlist,subject:subject,columns:columnnames,routevar:routevar})
  
  });
// Insert  route
router.post('/Books/PublisherAdmin/insert', async(req, res) => {
  var passedvalues = req.body.mergedObject
  var insert = await mysqlmodule.CreateSubLength(passedvalues.Subscription_Length,passedvalues.NumOfMonths)
  res.json({redirectUrl:"/admin/Magazines/sublengthAdmin"});

            });
  //  Update route
  router.post('/Books/PublisherAdmin/update', async(req, res) => {
    console.log("im updating")
  var passedvalues = req.body.mergedObject
  console.log(passedvalues)
  var update = await mysqlmodule.UpdateSubLength(passedvalues.Subscription_Length,passedvalues.NumOfMonths,passedvalues.Subscripton_lengthID)
  res.json({redirectUrl:"/admin/Magazines/sublengthAdmin"});
                                     });
  //  Update Delete Route
   router.post('/Books/PublisherAdmin/delete', async(req, res) => {
    var passedvalues = req.body.mergedObject
    console.log(passedvalues)
    var Delete = await mysqlmodule.DeleteSubLength(passedvalues.Subscripton_lengthID)
    res.json({redirectUrl:"/admin/Magazines/sublengthAdmin"});
  });
  
  

  


// Tommy Mannix 27/10/2024 
/////////////Venues Routes ///////////////////////////////////////
router.get('/events/Venues', async(req, res) => {
  var userinfo = banner.bannercreds(req.session)
  var columnnames = await mysqlmodule.GetVenueColumns()
  var subject = "Venue"
  var VenueList = await mysqlmodule.showvenues();
  routevar = "/admin/events/Venues"
    res.render("Pages/Authors",{userinfo:userinfo,subjectlist:VenueList,subject:subject,columns:columnnames,routevar:routevar})
  
  });
// Insert  route
router.post('/events/Venues/insert', async(req, res) => {
  var passedvalues = req.body.mergedObject
  var insert = await mysqlmodule.CreateVenue(passedvalues.Venue_Name,passedvalues.Venue_Address1,passedvalues.Venue_Address2,passedvalues.Venue_Postcode,
  passedvalues.Venue_Capacity)
  res.json({redirectUrl:"/admin/events/Venues"});

            });
  //  Update route
  router.post('/events/Venues/update', async(req, res) => {
  var passedvalues = req.body.mergedObject
  console.log(passedvalues)
  var update = await mysqlmodule.UpdateVenue(passedvalues.Venue_Name,passedvalues.Venue_Address1,passedvalues.Venue_Address2,passedvalues.Venue_Postcode,
    passedvalues.Venue_Capacity,passedvalues.Venue_ID)
  res.json({redirectUrl:"/admin/events/Venues"});
                                     });
  //  Update Delete Route
   router.post('/events/Venues/delete', async(req, res) => {
    var passedvalues = req.body.mergedObject
    console.log(passedvalues)
    var Delete = await mysqlmodule.DeleteVenue(passedvalues.Venue_ID)
    res.json({redirectUrl:"/admin/events/Venues"});
  });
  
  
  



  

// Tommy Mannix 27/10/2024 
/////////////Course type Routes ///////////////////////////////////////
router.get('/events/courseType', async(req, res) => {
  var userinfo = banner.bannercreds(req.session)
  var columnnames = await mysqlmodule.GetCourseTypeColumns()
  var subject = "course"
  var courseList = await mysqlmodule.showCourseTypes();
  routevar = "/admin/events/courseType"
    res.render("Pages/Authors",{userinfo:userinfo,subjectlist:courseList,subject:subject,columns:columnnames,routevar:routevar})
  
  });
// Insert  route
router.post('/events/courseType/insert', async(req, res) => {
  var passedvalues = req.body.mergedObject
  var insert = await mysqlmodule.CreateCourseType(passedvalues.CourseName,passedvalues.Course_Description)
  res.json({redirectUrl:"/admin/events/courseType"});

            });
  //  Update route
  router.post('/events/courseType/update', async(req, res) => {
  var passedvalues = req.body.mergedObject
  console.log(passedvalues)
  var update = await mysqlmodule.UpdateCourseType(passedvalues.CourseName,passedvalues.Course_Description,passedvalues.CourseID)
  res.json({redirectUrl:"/admin/events/courseType"});
                                     });
  //  Delete Route
   router.post('/events/courseType/delete', async(req, res) => {
    var passedvalues = req.body.mergedObject
    console.log(passedvalues)
    var Delete = await mysqlmodule.DeleteCourseType(passedvalues.CourseID)
    res.json({redirectUrl:"/admin/events/courseType"});
  });
  
  



  

// Tommy Mannix 27/10/2024 
/////////////expert type Routes ///////////////////////////////////////
router.get('/events/expertType', async(req, res) => {
  var userinfo = banner.bannercreds(req.session)
  var columnnames = await mysqlmodule.GetExperTypeColumns()
  var subject = "Expert Talk"
  var courseList = await mysqlmodule.showExpertTalks();
  routevar = "/admin/events/expertType"
    res.render("Pages/Authors",{userinfo:userinfo,subjectlist:courseList,subject:subject,columns:columnnames,routevar:routevar})
  
  });
// Insert  route
router.post('/events/expertType/insert', async(req, res) => {
  var passedvalues = req.body.mergedObject
  var insert = await mysqlmodule.CreateExpertType(passedvalues.Expert_EventName,passedvalues.Expert_Description)
  res.json({redirectUrl:"/admin/events/expertType"});

            });
  //  Update route
  router.post('/events/expertType/update', async(req, res) => {
  var passedvalues = req.body.mergedObject
  console.log(passedvalues)
  var update = await mysqlmodule.UpdateExpertType(passedvalues.Expert_EventName,passedvalues.Expert_Description,passedvalues.Expert_ID)
  res.json({redirectUrl:"/admin/events/expertType"});
                                     });
  //  Delete Route
   router.post('/events/expertType/delete', async(req, res) => {
    var passedvalues = req.body.mergedObject
    console.log(passedvalues)
    var Delete = await mysqlmodule.DeleteExpertType(passedvalues.Expert_ID)
    res.json({redirectUrl:"/admin/events/expertType"});
  });
  



  
// Tommy Mannix 27/10/2024 
/////////////Bookadmin Routes ///////////////////////////////////////
router.get('/Books/Bookadmin', async(req, res) => {
  var userinfo = banner.bannercreds(req.session)
  var columnnames = await mysqlmodule.GetBooklistrawColumns()
  var subject = "Book"
  var courseList = await mysqlmodule.GetBooklistraw();
  var authorlist = await mysqlmodule.GetAuthorList();
  var publisherlist = await mysqlmodule.GetPublishersList();
  routevar = "/admin/Books/Bookadmin"
    res.render("Pages/BookAdmin",{userinfo:userinfo,subjectlist:courseList,publisherlist:publisherlist,
      authorlist:authorlist,subject:subject,columns:columnnames,routevar:routevar})
  });

// Insert  route
router.post('/Books/Bookadmin/insert', async(req, res) => {
  var passedvalues = req.body.mergedObject
  var insert = await mysqlmodule.CreateBook(passedvalues.Book_Name,passedvalues.Book_ISBN,passedvalues.Book_Quantity,passedvalues.Book_EditionNumber,passedvalues.Book_Cover
    ,passedvalues.Book_UnitPrice,passedvalues.Author_ID,passedvalues.Publisher_ID)
  res.json({redirectUrl:"/admin/Books/Bookadmin"});

            });
  //  Update route
  router.post('/Books/Bookadmin/update', async(req, res) => {
  var passedvalues = req.body.mergedObject
  console.log(passedvalues)
  var update = await mysqlmodule.UpdateBook(passedvalues.Book_Name,passedvalues.Book_ISBN,passedvalues.Book_Quantity,passedvalues.Book_EditionNumber,passedvalues.Book_Cover
    ,passedvalues.Book_UnitPrice,passedvalues.Author_ID,passedvalues.Publisher_ID,passedvalues.Book_ID)
  res.json({redirectUrl:"/admin/Books/Bookadmin"});
                                     });
  //  Delete Route
   router.post('/Books/Bookadmin/delete', async(req, res) => {
    var passedvalues = req.body.mergedObject
    console.log(passedvalues)
    var Delete = await mysqlmodule.DeleteBook(passedvalues.Book_ID)
    res.json({redirectUrl:"/admin/Books/Bookadmin"});
  });
  


  
  
// Tommy Mannix 27/10/2024 
/////////////Magazine Routes ///////////////////////////////////////
router.get('/Books/Magazineadmin', async(req, res) => {
  var userinfo = banner.bannercreds(req.session)
  var columnnames = await mysqlmodule.GetMagazinelistrawColumns()
  var subject = "Magazine"
  var magazinelist = await mysqlmodule.ShowMagazineRaw();
  var frequencylist = await mysqlmodule.Show_Frequency();
  var publisherlist = await mysqlmodule.GetPublishersList();
  routevar = "/admin//Books/Magazineadmin"
    res.render("Pages/MagazineAdmin",{userinfo:userinfo,subjectlist:magazinelist,publisherlist:publisherlist,
      authorlist:frequencylist,subject:subject,columns:columnnames,routevar:routevar})
  });

// Insert  route
router.post('/Books/Magazineadmin/insert', async(req, res) => {
  var passedvalues = req.body.mergedObject
  var insert = await mysqlmodule.CreateMagazine(passedvalues.Magazine_Name,passedvalues.Magazine_IndividualPrice,
    passedvalues.Magazine_AnnualPrice, passedvalues.Magazine_MonthlyPrice, passedvalues.Publisher_ID,
    passedvalues.Magazine_FrequencyID)
  res.json({redirectUrl:"/admin/Books/Magazineadmin"});});
  //  Update route
  router.post('/Books/Magazineadmin/update', async(req, res) => {
  var passedvalues = req.body.mergedObject
  console.log(passedvalues)
  var update = await mysqlmodule.UpdateMagazine(passedvalues.Magazine_Name,passedvalues.Magazine_IndividualPrice,
    passedvalues.Magazine_AnnualPrice, passedvalues.Magazine_MonthlyPrice, passedvalues.Publisher_ID,
    passedvalues.Magazine_FrequencyID, passedvalues.Magazine_ID)
  res.json({redirectUrl:"/admin/Books/Magazineadmin"}); });
  //  Delete Route
   router.post('/Books/Magazineadminn/delete', async(req, res) => {
    var passedvalues = req.body.mergedObject
    console.log(passedvalues)
    var Delete = await mysqlmodule.DeleteMagazine(passedvalues.Magazine_ID)
    res.json({redirectUrl:"/admin/Books/Magazineadmin"});
  });
  




  
  
// Tommy Mannix 28/10/2024 
/////////////Coruse offering Routes ///////////////////////////////////////
router.get('/Books/CourseOffering', async(req, res) => {
  var userinfo = banner.bannercreds(req.session)
  var columnnames = await mysqlmodule.GetCourseInstanceColumns()
  var subject = "Course Offering"
  var magazinelist = await mysqlmodule.ShowCourseRaw();
  var frequencylist = await mysqlmodule.Show_Staff();
  var publisherlist = await mysqlmodule.showvenues();
  var coursetypelist = await mysqlmodule.showCourseTypes();
  routevar = "/admin/Books/CourseOffering"
    res.render("Pages/CourseOfferingAdmin",{userinfo:userinfo,subjectlist:magazinelist,publisherlist:publisherlist,
      authorlist:frequencylist,subject:subject,columns:columnnames,routevar:routevar,coursetypelist:coursetypelist})
  });
// Insert  route
router.post('/Books/Magazineadmin/insert', async(req, res) => {
  var passedvalues = req.body.mergedObject
  var insert = await mysqlmodule.CreateCourseInstance(passedvalues.Course_AdultPrice,passedvalues.Course_ChildPrice,
    passedvalues.Course_ConcessionPrice, passedvalues.CourseID, passedvalues.Venue_ID,
    passedvalues.Staff_ID,passedvalues.StartTime,passedvalues.Course_StartDate)
  res.json({redirectUrl:"/admin/Books/CourseOffering"});
            });
  //  Update route
  router.post('/Books/Magazineadmin/update', async(req, res) => {
  var passedvalues = req.body.mergedObject
  console.log(passedvalues)
  var update = await mysqlmodule.UpdarteCourseInstance(passedvalues.Course_AdultPrice,passedvalues.Course_ChildPrice,
    passedvalues.Course_ConcessionPrice, passedvalues.CourseID, passedvalues.Venue_ID,
    passedvalues.Staff_ID,passedvalues.StartTime,passedvalues.Course_StartDate, passedvalues.Course_InstanceID)
  res.json({redirectUrl:"/admin/Books/CourseOffering"});                             });
  //  Delete Route
   router.post('/Books/Magazineadminn/delete', async(req, res) => {
    var passedvalues = req.body.mergedObject
    console.log(passedvalues)
    var Delete = await mysqlmodule.DeleteCourseOffering(passedvalues.Course_InstanceID)
    res.json({redirectUrl:"/admin/Books/CourseOffering"});
  });
  


  
// Tommy Mannix 28/10/2024 
/////////////Expert Talk offering Routes ///////////////////////////////////////
router.get('/events/ExpertOffering', async(req, res) => {
  var userinfo = banner.bannercreds(req.session)
  var columnnames = await mysqlmodule.GetExpertInstanceColumns()
  var subject = "expert Offering"
  var magazinelist = await mysqlmodule.ShowExpertRaw();
  var publisherlist = await mysqlmodule.showvenues();
  var coursetypelist = await mysqlmodule.showExpertTalks();
  routevar = "/admin/events/ExpertOffering"
    res.render("Pages/ExpertTalkOfferingAdmin",{userinfo:userinfo,subjectlist:magazinelist,publisherlist:publisherlist,
      subject:subject,columns:columnnames,routevar:routevar,coursetypelist:coursetypelist})
  });
// Insert  route
router.post('/events/ExpertOffering/insert', async(req, res) => {
  var passedvalues = req.body.mergedObject
  var insert = await mysqlmodule.CreateExpertInstance(passedvalues.Expert_Date,passedvalues.Expert_Time,
    passedvalues.Venue_ID, passedvalues.Expert_ID)
  res.json({redirectUrl:"/admin/events/ExpertOffering"});

            });
  //  Update route
  router.post('/events/ExpertOffering/update', async(req, res) => {
  var passedvalues = req.body.mergedObject
  console.log(passedvalues)
  var update = await mysqlmodule.UpdarteExpertInstance(passedvalues.Expert_Date,passedvalues.Expert_Time,
    passedvalues.Venue_ID, passedvalues.Expert_ID, passedvalues.Expert_EventID)
  res.json({redirectUrl:"/admin/events/ExpertOffering"});
                                     });
  //  Delete Route
   router.post('/events/ExpertOffering/delete', async(req, res) => {
    var passedvalues = req.body.mergedObject
    console.log(passedvalues)
    var Delete = await mysqlmodule.DeleteExpertOffering(passedvalues.Expert_EventID)
    res.json({redirectUrl:"/admin/events/ExpertOffering"});
  });
  

    module.exports = router