// Tommy Mannix 26/10/2024
const bcrypt = require('bcrypt');
const mysqlmodule = require("./mySQLModule");
const saltRounds = 10; // Typically a value between 10 and 12
var returnhash
async function  generatehash(userPassword){

    console.log("start")
  
    const hashedPassword = await new Promise((resolve, reject) =>
    {

     bcrypt.genSalt(saltRounds, async (err, salt) =>   {
    if (err) {
        // Handle error
        return;
    }
    bcrypt.hash(userPassword, salt, async  (err, hash) => {
        if (err) reject(err)
        console.log(hash)
        resolve(hash)
      });
    });
    });
return hashedPassword
}
var outcome


// Tommy Mannix 26/10/2024
async function comparehash(userInputPassword,username){
   try{
    var storedHashedPassword = await mysqlmodule.authentication(username)

    console.log(storedHashedPassword)
   // const storedHashedPassword = 'hashed_password_from_database';
//const userInputPassword = 'password_attempt_from_user';

//console.log( storedHashedPassword[0].Login_Password)
var name = storedHashedPassword[0].Customer_FirstName
var access =  storedHashedPassword[0].Login_AccessLevel
var customerID =storedHashedPassword[0].ID
outcome = await bcrypt.compare(userInputPassword, storedHashedPassword[0].Login_Password);
const resultant = [outcome,name,access,customerID]
console.log(resultant)
return resultant
   }
  catch(err){
console.log(err)
    return outcome  = false
   }
}


module.exports ={generatehash,comparehash}