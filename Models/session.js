
const SessionModule ={
 sess: {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 3600000 
    },
    resave: false,
    saveUninitialized: true,
    
  }
};
module.exports = SessionModule;