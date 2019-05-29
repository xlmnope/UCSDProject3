// Will be used to route GET and POST from and to the database

// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
//
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the users has valid login credentials, send them to the members page.
  // Otherwise the users will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log('test');
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the users back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
  //
  // Route for signing up a users. The users's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize users Model. If the users is created successfully, proceed to log the users in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log("users info: ", req.body);
    db.User.create({
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  //
  // Route for logging users out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about our users to be used client side
  app.get("/api/users_data", function (req, res) {
    if (!req.user) {
      // The users is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the users's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        phone: req.user.phone,
        id: req.user.id
      });
    }
  });

  // Get all items to show in UI
  app.get("/api/items", function (req, res) {
    

    
    db.Item.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
  
    });
  });


  app.post("/api/items", function (req, res) {
    
   console.log(req.body, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"); //returns 'on'
  });

  app.post('/', (req, res) => {
    // const request = req.body;
    // let drink = request.drink;

   console.log(req.body, "BBBBBBB"); //returns 'on'
})

  app.post("/api/checkout", function (req, res) {
    db.Checkout.create({ items: req.body.items })
    res.status(200).end();
  });






};
