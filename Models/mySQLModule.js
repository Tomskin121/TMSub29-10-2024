var mysql = require('mysql')

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user :process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    
    });


    // this SQL query will handle the checking of passwords in concert with the hashing check
    // a user name is passed to it and and it returns a valid password which is in a hashed 
    //format, this is then passed back to the hashing module for processing
    // Tommy Mannix 17/10/2024
    function authentication(username){
        const sql = "Select * FROM Authentication where Login_UserName = ?";
        const values = username; //[]
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }



// This Query will retrieve all the books in the book library for purchase
    // Tommy Mannix 17/10/2024
        function Listbooks(){
            const sql = `SELECT * FROM listbooks ORDER BY Book_Name`;
            const values = []; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


            // This Query will retrieve all the data for a customer 
    // Tommy Mannix 23/10/2024
        function getCustomerData(CustomerID){
            const sql = ` SELECT * FROM ViewCustomerDetails where CustomerID = ?`;
            const values = [CustomerID]; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


           
            
// This Query will retrieve all the Magazines in the book library for purchase
    // Tommy Mannix 18/10/2024
        function ListMagazines(){
            const sql = `
            SELECT * FROM ListMagazines ORDER BY Magazine_Name`;
            const values = []; // 
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


            
            
// This Query will be used to retrieve the information for a given magazine subscription
    // Tommy Mannix 19/10/2024
        function Subscribeget(MagazineID){
            const sql = `
            SELECT * FROM ListMagazines WHERE Magazine_ID = ?
            ORDER BY Magazine_Name `;
            
            const values = [MagazineID]; //
            
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }

                  
// This Query will be used to retrieve the customers stored billing addresses
    // Tommy Mannix 20/10/2024
        function GetCustomerBilling(CustomerID){
            const sql = `
            SELECT * FROM TblBilling WHERE CustomerID = ?`;
            
            const values = [CustomerID]; //
            
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }   

// This Query will be used to retrieve the customers stored Delivery addresses
    // Tommy Mannix 20/10/2024
            function GetCustomerShipping(CustomerID){
                const sql = `
                SELECT * FROM TblShipping WHERE CustomerID = ?`;
                
                const values = [CustomerID]; //
                
                return new Promise ((resolve, reject) => {
                    con.query(sql,values,(error,results, fields) =>{
                if (error){
                    reject(error)
                }
                else{
                    resolve(results)
                }
                });
                });
                } 
// This Query will retrieve all the Courses available to be booked
    // Tommy Mannix 18/10/2024
        function ListCourses(){
            const sql = `
            SELECT * FROM ListUpcomingCourses
ORDER BY Date asc`;
            
            const values = []; //
            
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


            // This Query will retrieve  the Course details in the more information button to be booked
    // Tommy Mannix 18/10/2024
        function moreinfoCourses(CourseRef){
            const sql = `
            SELECT * FROM ListUpcomingCourses where Course_InstanceID = ?
            ORDER BY Date asc`;
            
            const values = [CourseRef]; //
            
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


            // This Query will retrieve all the Meeting Methods available to be booked
    // Tommy Mannix 18/10/2024
        function MeetingMethods(){
            const sql = `
            SELECT * FROM TblMeetingMethod
            ORDER BY Genealogy_MeetMethod asc`;
            
            const values = []; //
            
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


                    
            
// This Query will retrieve all the expert Talks available to be booked
    // Tommy Mannix 18/10/2024
        function ListExpertTalks(){
            const sql = `
            SELECT * FROM ListExpertTalks`;
            
            const values = []; //
            
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


            
            
// This Query will retrieve  the expert Talks information available to be booked
    // Tommy Mannix 25/10/2024
        function MoreInfoExpertTalks(ref){
            const sql = `
            SELECT * FROM ListExpertTalks where Expert_EventID = ?`;
            
            const values = [ref]; //
            
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }

                       
// This Query will retrieve all the Geneology subjects available to be booked
    // Tommy Mannix 18/10/2024
        function ListGeneaology(){
            const sql = `
            SELECT Genealogy_Subject FROM TblGeneaology;`;
            
            const values = []; //
            
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


                             
// This Query will retrieve all the subscriptions for the passed subscription id available to be booked
    // Tommy Mannix 20/10/2024
        function subscriptiondetails(SubID){
            const sql = `
            select * from AllActiveSubscriptions where Subscription_ID =  ?;`;
            
            const values = [SubID]; //
            
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


            
                             
// This Query will retrieve all the subscriptions for the given user 
    // Tommy Mannix 23/10/2024
        function subscriptiondetailsindividual(CustomerID){
            const sql = `
            select * from AllActiveSubscriptions where CustomerID =  ?;`;
            
            const values = [CustomerID]; //
            
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }
           
// This Query will create  a new Customer course booking in the database
    // Tommy Mannix 23/10/2024
    function callInsertCustomerCourseBooking(
        InCustomerID,InBillingID,NameonCard,cardnumber,CVV,Childquant,adultQuant,concessionQuant,courseInstance){
        const sql = `
        call CreateCourseBooking(?,?,?,?,?,?,?,?,?)`;
            const values = [InCustomerID,
                InBillingID || null,
                NameonCard|| null,
                cardnumber || null,
                CVV || null,
                Childquant,adultQuant,concessionQuant,courseInstance]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }         
// This Query will insert a new subscription for a customer using a stored procedure in the database
    // Tommy Mannix 20/10/2024
    function callsubscriptioninsert(MagazineID, subscriptionmethod, subscriptiondeliverymethod, deliveryid,
        firstname, lastname, address1, address2,postcode, billingmethodid, cardname, cardnumber, cardcvv, cusotmerid){
        const sql = ` call CreateSubscription(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            const values = [MagazineID,     subscriptionmethod,     subscriptiondeliverymethod,     deliveryid || null,     firstname,
                lastname,  address1,   address2,   postcode,   billingmethodid || null,  cardname,  cardnumber,  cardcvv,  cusotmerid]; 

        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }



        
        // This Query will insert a new book order for a customer using a stored procedure in the database
    // Tommy Mannix 26/10/2024
    function callCreateBookOrder(deliveryid,firstname, lastname,address1,
        address2,postcode,billingmethodid,cardname,cardnumber,cardcvv,
        cusotmerid, cart){
        const sql = `call CallCreateBookOrder(?,?,?,?,?,?,?,?,?,?,?,?)`;
            const values = [
                deliveryid || null,firstname, lastname,address1,address2,postcode,billingmethodid || null,
                cardname,cardnumber,cardcvv,cusotmerid,cart]; //
       return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


                  
// This Query will insert a new Customer in the database
    // Tommy Mannix 22/10/2024
    function callinsertCustomer(
        FirstName,surname,add1,add2,postcode,HomeNumber,mobilenumber,Customer_Email,Pw){
        const sql = `
        call CreateCustomer(?,?,?,?,?,?,?,?,?)`;
            const values = [FirstName,surname,add1,add2,postcode,HomeNumber,mobilenumber,Customer_Email,Pw]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


        // This function gets a list of authors from the ShowAuthors view
        // Tommy Mannix 27/10/2024
        function GetAuthorList(){
            const sql = `SELECT * from ShowAuthors`;
                const values = []; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }
    

            function callcreateauthor(AuthorFirst,AuthorSecond){
                const sql = `
                call CreateAuthor(?,?)`;
                    const values = [AuthorFirst,AuthorSecond]; //
                return new Promise ((resolve, reject) => {
                    con.query(sql,values,(error,results, fields) =>{
                if (error){
                    reject(error)
                }
                else{
                    resolve(results)
                }
                });
                });
                }

// Tommy Mannix 27/10/2024 This function updates the author 
                function callupdateauthor(AuthorFirst,AuthorSecond,AuthorID){
                    const sql = `
                    call UpdateAuthor(?,?,?)`;
                        const values = [AuthorFirst,AuthorSecond,AuthorID]; //
                    return new Promise ((resolve, reject) => {
                        con.query(sql,values,(error,results, fields) =>{
                    if (error){
                        reject(error)
                    }
                    else{
                        resolve(results)
                    }
                    });
                    });
                    }
                
// Tommy Mannix 27/10/2024 This function Deletes the author 
                    function DeleteAuthor(AuthorID){
                        const sql = `
                        Delete from TblAuthors where Author_ID = ?;`;
                            const values = [AuthorID]; //
                        return new Promise ((resolve, reject) => {
                            con.query(sql,values,(error,results, fields) =>{
                        if (error){
                            reject(error)
                        }
                        else{
                            resolve(results)
                        }
                        });
                        });
                        }
            
            // this gets a list of the author columns
            //Tommy Mannix 27/10/2024
            function GetAuthorColumns(){
                const sql = `select COLUMN_NAME  from information_schema.columns 
               where table_schema = 'SteppingIntoHistory'   and table_name = 'ShowAuthors'`;
                    const values = []; //
                return new Promise ((resolve, reject) => {
                    con.query(sql,values,(error,results, fields) =>{
                if (error){
                    reject(error)
                }
                else{
                    resolve(results)
                }
                });
                });
                }
        
                // This function gets a list of authors from the ShowAuthors view
        // Tommy Mannix 27/10/2024
        function GetPublishersList(){
            const sql = `SELECT * from ShowPublishers`;
                const values = []; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }   
            
              
            // this gets a list of the author columns
            //Tommy Mannix 27/10/2024
            function GetPublisherColumns(){
                const sql = `select COLUMN_NAME  from information_schema.columns 
               where table_schema = 'SteppingIntoHistory' and table_name = 'ShowPublishers' ORDER BY
               ordinal_position;`;
                    const values = []; //
                return new Promise ((resolve, reject) => {
                    con.query(sql,values,(error,results, fields) =>{
                if (error){
                    reject(error)
                }
                else{
                    resolve(results)
                }
                });
                });
                }

// This Query will Update a new publisher in the database
    // Tommy Mannix 27/10/2024
    function CallCreatePublisher(
        InPublisherName,add1,add2,postcode){
        const sql = `
        call CreatePublisher(?,?,?,?)`;
            const values = [InPublisherName,add1,add2,postcode]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

        // This Query will Update a  publisher in the database
    // Tommy Mannix 27/10/2024
    function CallUpdatePublisher(
        InPublisherName,add1,add2,postcode,publisherID){
        const sql = `
        call UpdatePublisher(?,?,?,?,?)`;
            const values = [InPublisherName,add1,add2,postcode,publisherID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

              // This Query will Update a  publisher in the database
    // Tommy Mannix 27/10/2024
    function deletePublisher(
        publisherID){
        const sql = `
     DELETE from TblPublishers where Publisher_ID = ? `;
            const values = [publisherID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

// This Query will Update a new Customer in the database
    // Tommy Mannix 23/10/2024
    function callUpdateCustomer(
        FirstName,surname,add1,add2,postcode,HomeNumber,mobilenumber,Customer_Email,id){
        const sql = `
        call UpdateCustomer(?,?,?,?,?,?,?,?,?)`;
            const values = [FirstName,surname,add1,add2,postcode,HomeNumber,mobilenumber,Customer_Email,id]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

                         
// This Query will create a new expert talk booking in the database
    // Tommy Mannix 25/10/2024
    function CreateExpertBooking(
       CustomerID, talkref){
        const sql = `
        call CreateExpertBooking(?,?)`;
            const values = [CustomerID,talkref]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


       // This Query will select the existing subscription lengths in the database
    // Tommy Mannix 27/10/2024
    function showSubLength(){
         const sql = `
        SELECT * FROM ViewSubscriptionLengths`;
             const values = []; //
         return new Promise ((resolve, reject) => {
             con.query(sql,values,(error,results, fields) =>{
         if (error){
             reject(error)
         }
         else{
             resolve(results)
         }
         });
         });
         }

        // This Query will create a new subscription length in the database
    // Tommy Mannix 27/10/2024
    function CreateSubLength(
        SublengthName, SubLength){
         const sql = `
         call CreateSubLength(?,?)`;
             const values = [SublengthName,SubLength]; //
         return new Promise ((resolve, reject) => {
             con.query(sql,values,(error,results, fields) =>{
         if (error){
             reject(error)
         }
         else{
             resolve(results)
         }
         });
         });
         }


            // This Query will update a new subscription length in the database
    // Tommy Mannix 27/10/2024
    function UpdateSubLength(
        SublengthName, SubLength,SubID){
         const sql = `
         call UpdateSubLength(?,?,?)`;
             const values = [SublengthName,SubLength,SubID]; //
         return new Promise ((resolve, reject) => {
             con.query(sql,values,(error,results, fields) =>{
         if (error){
             reject(error)
         }
         else{
             resolve(results)
         }
         });
         });
         }

                    // This Query will update a new subscription length in the database
    // Tommy Mannix 27/10/2024
    function DeleteSubLength(
      SubID){
         const sql = `
         call DeleteSubLength(?)`;
             const values = [SubID]; //
         return new Promise ((resolve, reject) => {
             con.query(sql,values,(error,results, fields) =>{
         if (error){
             reject(error)
         }
         else{
             resolve(results)
         }
         });
         });
         }
 
           // this gets a list of the sub columns
            //Tommy Mannix 27/10/2024
            function GetSublengthColumns(){
                const sql = `select COLUMN_NAME  from information_schema.columns 
               where table_schema = 'SteppingIntoHistory' and table_name = 'ViewSubscriptionLengths' ORDER BY
               ordinal_position;`;
                    const values = []; //
                return new Promise ((resolve, reject) => {
                    con.query(sql,values,(error,results, fields) =>{
                if (error){
                    reject(error)
                }
                else{
                    resolve(results)
                }
                });
                });
                }

 



                
       // This Query will select the existing venues in the database
    // Tommy Mannix 27/10/2024
    function showvenues(){
        const sql = `
       SELECT * FROM ShowVenues`;
            const values = []; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

       // This Query will create a new subscription length in the database
   // Tommy Mannix 27/10/2024
   function CreateVenue(
    VenueName, Venueadd1,venueadd2,venue_Postcode,Venue_Capacity){
        const sql = `
        call CreateVenue(?,?,?,?,?)`;
            const values = [VenueName,Venueadd1,venueadd2,venue_Postcode,Venue_Capacity]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


           // This Query will update a new subscription length in the database
   // Tommy Mannix 27/10/2024
   function UpdateVenue(
    VenueName, Venueadd1,venueadd2,venue_Postcode,Venue_Capacity,venueID){
        const sql = `
        call UpdateVenue(?,?,?,?,?,?)`;
            const values =  [VenueName,Venueadd1,venueadd2,venue_Postcode,Venue_Capacity,venueID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

                   // This Query will update a new subscription length in the database
   // Tommy Mannix 27/10/2024
   function DeleteVenue(
     venueID){
        const sql = `
       Delete from TblVenues where Venue_ID = ?`;
            const values = [venueID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

          // this gets a list of the  columns
           //Tommy Mannix 27/10/2024
           function GetVenueColumns(){
               const sql = `select COLUMN_NAME  from information_schema.columns 
              where table_schema = 'SteppingIntoHistory' and table_name = 'ShowVenues' ORDER BY
              ordinal_position;`;
                   const values = []; //
               return new Promise ((resolve, reject) => {
                   con.query(sql,values,(error,results, fields) =>{
               if (error){
                   reject(error)
               }
               else{
                   resolve(results)
               }
               });
               });
               }


         
       // This Query will select the existing Course Types in the database
    // Tommy Mannix 27/10/2024
    function showCourseTypes(){
        const sql = `
       SELECT * FROM ListCourseTypes`;
            const values = []; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

       // This Query will create a new CreateCourseType  in the database
   // Tommy Mannix 27/10/2024
   function CreateCourseType(
    CourseName,Course_Description){
        const sql = `
        call CreateCourseType(?,?)`;
            const values = [CourseName,Course_Description]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


           // This Query will update a course type in the database
   // Tommy Mannix 27/10/2024
   function UpdateCourseType(
    CourseName,Course_Description,CourseTypeID){
        const sql = `
        call UpdateCourseType(?,?,?)`;
            const values =  [ CourseName,Course_Description,CourseTypeID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

                   // This Query will delete a course type in the database
   // Tommy Mannix 27/10/2024
   function DeleteCourseType(
    CourseTypeID){
        const sql = `
       Delete from TblCourses where CourseID = ?`;
            const values = [CourseTypeID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

          // this gets a list of the  columns
           //Tommy Mannix 27/10/2024
           function GetCourseTypeColumns(){
               const sql = `select COLUMN_NAME  from information_schema.columns 
              where table_schema = 'SteppingIntoHistory' and table_name = 'ListCourseTypes' ORDER BY
              ordinal_position;`;
                   const values = []; //
               return new Promise ((resolve, reject) => {
                   con.query(sql,values,(error,results, fields) =>{
               if (error){
                   reject(error)
               }
               else{
                   resolve(results)
               }
               });
               });
               }
        



               
       // This Query will select the existing Expert Types in the database
    // Tommy Mannix 27/10/2024
    function showExpertTalks(){
        const sql = `
       SELECT * FROM ListExpertTalkCategories`;
            const values = []; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

       // This Query will create a new Expert type  in the database
   // Tommy Mannix 27/10/2024
   function CreateExpertType(
    Expert_EventName,Expert_Description){
        const sql = `
        call CreateExpertType(?,?)`;
            const values = [Expert_EventName,Expert_Description]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


           // This Query will update a Expert type in the database
   // Tommy Mannix 27/10/2024
   function UpdateExpertType(
    Expert_EventName,Expert_Description,Expert_ID){
        const sql = `
        call UpdateExpertType(?,?,?)`;
            const values =  [ Expert_EventName,Expert_Description,Expert_ID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

                   // This Query will delete a Expert type in the database
   // Tommy Mannix 27/10/2024
   function DeleteExpertType(
    Expert_ID){
        const sql = `
       Delete from TblExpertTalks where Expert_ID = ?`;
            const values = [Expert_ID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

          // this gets a list of the  columns
           //Tommy Mannix 27/10/2024
           function GetExperTypeColumns(){
               const sql = `select COLUMN_NAME  from information_schema.columns 
              where table_schema = 'SteppingIntoHistory' and table_name = 'ListExpertTalkCategories' ORDER BY
              ordinal_position;`;
                   const values = []; //
               return new Promise ((resolve, reject) => {
                   con.query(sql,values,(error,results, fields) =>{
               if (error){
                   reject(error)
               }
               else{
                   resolve(results)
               }
               });
               });
               }



                    // this gets a list of the  columns
           //Tommy Mannix 27/10/2024
           function GetBooklistraw(){
            const sql = `select * from webbookview`;
                const values = []; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }

            // this gets a list of the  columns
           //Tommy Mannix 27/10/2024
           function GetBooklistrawColumns(){
            const sql = `select COLUMN_NAME  from information_schema.columns 
           where table_schema = 'SteppingIntoHistory' and table_name = 'webbookview' ORDER BY
           ordinal_position;`;
                const values = []; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }

              // This Query will create a new Book  in the database
   // Tommy Mannix 27/10/2024
   function CreateBook(
    Book_Name,Book_ISBN,Book_Quantity,Book_EditionNumber,Book_Cover,Book_UnitPrice,
    Author_ID,Publisher_ID ){
        const sql = `
        call CreateBook(?,?,?,?,?,?,?,?)`;
            const values = [Book_Name,Book_ISBN,Book_Quantity,Book_EditionNumber,Book_Cover,Book_UnitPrice,
                Author_ID,Publisher_ID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


           // This Query will update a book in the database
   // Tommy Mannix 27/10/2024
   function UpdateBook(
    Book_Name,Book_ISBN,Book_Quantity,Book_EditionNumber,Book_Cover,Book_UnitPrice,
    Author_ID,Publisher_ID,Book_ID){
        const sql = `
        call CallUpdateBook(?,?,?,?,?,?,?,?,?)`;
            const values =  [ Book_Name,Book_ISBN,Book_Quantity,Book_EditionNumber,Book_Cover,Book_UnitPrice,
                Author_ID,Publisher_ID,Book_ID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

                   // This Query will delete a book  in the database
   // Tommy Mannix 27/10/2024
   function DeleteBook(
    Book_ID){
        const sql = `
       Delete from TblBooks where Book_ID = ?`;
            const values = [Book_ID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


          // This Query will get a list of the magazine frequencys available
          // to be assigned to a magazine  in the database
   // Tommy Mannix 28/10/2024
   function Show_Frequency(
    ){
        const sql = ` SELECT * FROM Show_Frequency`;
            const values = []; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

        


            // this gets a list of the  columns
           //Tommy Mannix 28/10/2024
           function GetMagazinelistrawColumns(){
            const sql = `select COLUMN_NAME  from information_schema.columns 
           where table_schema = 'SteppingIntoHistory' and table_name = 'webMagazineView' ORDER BY
           ordinal_position;`;
                const values = []; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


            
            // this gets a list of the  magazines from the database view
           //Tommy Mannix 28/10/2024
           function ShowMagazineRaw(){
            const sql = `select * from webMagazineView`;
                const values = []; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }

              // This Query will create a magazine  in the database
   // Tommy Mannix 28/10/2024
   function CreateMagazine(
    Magazine_Name,Magazine_IndividualPrice,Magazine_AnnualPrice,
Magazine_MonthlyPrice,Publisher_ID,Magazine_FrequencyID ){
        const sql = `
        call CreateMagazine(?,?,?,?,?,?)`;
            const values = [Magazine_Name,Magazine_IndividualPrice,Magazine_AnnualPrice,
                Magazine_MonthlyPrice,Publisher_ID,Magazine_FrequencyID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


           // This Query will update a magazine in the database
   // Tommy Mannix 28/10/2024
   function UpdateMagazine(
    Magazine_Name,Magazine_IndividualPrice,Magazine_AnnualPrice,
    Magazine_MonthlyPrice,Publisher_ID,Magazine_FrequencyID, Magazine_ID){
        const sql = `
        call UpdateMagazine(?,?,?,?,?,?,?)`;
            const values =  [   Magazine_Name,Magazine_IndividualPrice,Magazine_AnnualPrice,
                Magazine_MonthlyPrice,Publisher_ID,Magazine_FrequencyID,Magazine_ID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

                   // This Query will delete a Magazine  in the database
   // Tommy Mannix 28/10/2024
   function DeleteMagazine(
    Book_ID){
        const sql = `
       Delete from TblMagazines where Magazine_ID = ?`;
            const values = [Book_ID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }







        // Course Admin
        

          // This Query will get a list of the Staff members available
   // Tommy Mannix 28/10/2024
   function Show_Staff(
    ){
        const sql = ` SELECT * FROM ShowStaff`;
            const values = []; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

        


            // this gets a list of the  columns
           //Tommy Mannix 28/10/2024
           function GetCourseInstanceColumns(){
            const sql = `select COLUMN_NAME  from information_schema.columns 
           where table_schema = 'SteppingIntoHistory' and table_name = 'WebCourseView' ORDER BY
           ordinal_position;`;
                const values = []; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


            
            // this gets a list of the  courses from the database view
           //Tommy Mannix 28/10/2024
           function ShowCourseRaw(){
            const sql = `select * from WebCourseView`;
                const values = []; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }

              // This Query will create a course  in the database
   // Tommy Mannix 28/10/2024
   function CreateCourseInstance(
    Course_AdultPrice,Course_ChildPrice,Course_ConcessionPrice,
CourseID,Venue_ID,Staff_ID,StartTime,Course_StartDate){
        const sql = `
        call CreateCourseOffering(?,?,?,?,?,?,?,?)`;
            const values = [ Course_AdultPrice,Course_ChildPrice,Course_ConcessionPrice,
                CourseID,Venue_ID,Staff_ID,StartTime,Course_StartDate]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


           // This Query will update a coruse in the database
   // Tommy Mannix 28/10/2024
   function UpdarteCourseInstance(
    Course_AdultPrice,Course_ChildPrice,Course_ConcessionPrice,
CourseID,Venue_ID,Staff_ID,StartTime,Course_StartDate,Course_InstanceID){
        const sql = `
        call UpdateMagazine(?,?,?,?,?,?,?,?,?)`;
            const values =  [  Course_AdultPrice,Course_ChildPrice,Course_ConcessionPrice,
                CourseID,Venue_ID,Staff_ID,StartTime,Course_StartDate,Course_InstanceID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }
                   // This Query will delete a course  in the database
   // Tommy Mannix 28/10/2024
   function DeleteCourseOffering(
    Course_InstanceID){
        const sql = `
       Delete from TblCourseDetail where Course_InstanceID = ?`;
            const values = [Course_InstanceID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }





            // this gets a list of the  columns in the expert list web view
           //Tommy Mannix 28/10/2024
           function GetExpertInstanceColumns(){
            const sql = `select COLUMN_NAME  from information_schema.columns 
           where table_schema = 'SteppingIntoHistory' and table_name = 'WebExpertList' ORDER BY
           ordinal_position;`;
                const values = []; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }


            
            // this gets a list of the  Expert talks from the database view
           //Tommy Mannix 28/10/2024
           function ShowExpertRaw(){
            const sql = `select * from WebExpertList`;
                const values = []; //
            return new Promise ((resolve, reject) => {
                con.query(sql,values,(error,results, fields) =>{
            if (error){
                reject(error)
            }
            else{
                resolve(results)
            }
            });
            });
            }

              // This Query will create a Expert talk event  in the database
   // Tommy Mannix 28/10/2024
   function CreateExpertInstance(
    Expert_Date,Expert_Time,Venue_ID,Expert_ID){
        const sql = `
        call CreateExpertTalkOffering(?,?,?,?)`;
            const values = [ Expert_Date,Expert_Time,Venue_ID,Expert_ID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


           // This Query will update a expert event in the database
   // Tommy Mannix 28/10/2024
   function UpdarteExpertInstance(
    Expert_Date,Expert_Time,Venue_ID,Expert_ID,Expert_EventID){
        const sql = `
        call UpdateExpertOffering(?,?,?,?,?)`;
            const values =  [ Expert_Date,Expert_Time,Venue_ID,Expert_ID,Expert_EventID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }

                   // This Query will delete a expert event  in the database
   // Tommy Mannix 28/10/2024
   function DeleteExpertOffering(
    Expert_EventID){
        const sql = `
       Delete from TblExpertDetail where Expert_EventID = ?`;
            const values = [Expert_EventID]; //
        return new Promise ((resolve, reject) => {
            con.query(sql,values,(error,results, fields) =>{
        if (error){
            reject(error)
        }
        else{
            resolve(results)
        }
        });
        });
        }


module.exports = {
    GetExpertInstanceColumns,
    ShowExpertRaw,
    CreateExpertInstance,
    UpdarteExpertInstance,
    DeleteExpertOffering,

    GetCourseInstanceColumns,
    DeleteCourseOffering,
    UpdarteCourseInstance,
    CreateCourseInstance,
    ShowCourseRaw,
    Show_Staff,

    ShowMagazineRaw,
    Show_Frequency,
    DeleteMagazine,
    UpdateMagazine,
    CreateMagazine,
    GetMagazinelistrawColumns,

    CreateBook,
    UpdateBook,
    DeleteBook,
    GetBooklistrawColumns,
    GetBooklistraw,


    showExpertTalks,
    GetExperTypeColumns,
    DeleteExpertType,
    UpdateExpertType,
    CreateExpertType,

    GetCourseTypeColumns,
    DeleteCourseType,
    UpdateCourseType,
    CreateCourseType,
    showCourseTypes,


    showvenues,
    GetVenueColumns,
    DeleteVenue,
    UpdateVenue,
    CreateVenue,

    showSubLength,
    CreateSubLength,
    UpdateSubLength,
    DeleteSubLength,
    GetSublengthColumns,

authentication,
Listbooks,
ListMagazines,
ListCourses,
ListExpertTalks,
ListGeneaology,
MeetingMethods,
Subscribeget,
GetCustomerBilling,
GetCustomerShipping,
callsubscriptioninsert,
subscriptiondetails,
callinsertCustomer,
getCustomerData,
callUpdateCustomer,
subscriptiondetailsindividual,
moreinfoCourses,
callInsertCustomerCourseBooking,
MoreInfoExpertTalks,
CreateExpertBooking,
callCreateBookOrder,
GetAuthorList,
GetAuthorColumns,
callcreateauthor,
callupdateauthor,
DeleteAuthor,
GetPublishersList,
GetPublisherColumns,
CallCreatePublisher,
CallUpdatePublisher,
deletePublisher
};