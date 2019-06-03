// Will be used to route GET and POST from and to the database

// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var fs = require('fs');
var formidable = require('formidable');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var path = require("path")
//;
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


  //Admin section
/**
 * Index route
 */
app.get('/adminPage', function (req, res) {
  // Don't bother about this :)
  var filesPath = path.join(__dirname, '../uploads/');
  fs.readdir(filesPath, function (err, files) {
      if (err) {
          console.log(err);
          return;
      }

      files.forEach(function (file) {
          fs.stat(filesPath + file, function (err, stats) {
              if (err) {
                  console.log(err);
                  return;
              }

              var createdAt = Date.parse(stats.ctime),
                  days = Math.round((Date.now() - createdAt) / (1000*60*60*24));

              if (days > 1) {
                  fs.unlink(filesPath + file);
              }
          });
      });
  });

  res.sendFile(path.join(__dirname, '../public/adminPage.html'));
});

/**
* Upload photos route.
*/
app.post('/upload_photos', function (req, res) {
  var photos = [],
      form = new formidable.IncomingForm();

  // Tells formidable that there will be multiple files sent.
  form.multiples = true;
  // Upload directory for the images
  form.uploadDir = path.join(__dirname, '../tmp_uploads');

  // Invoked when a file has finished uploading.
  form.on('file', function (name, file) {
      // Allow only 3 files to be uploaded.
      if (photos.length === 3) {
          fs.unlink(file.path);
          return true;
      }

      var buffer = null,
          type = null,
          filename = '';

      buffer = readChunk.sync(file.path, 0, 262);
      type = fileType(buffer);

      // Check the file type, must be either png,jpg or jpeg
      if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
          // Assign new file name
          filename = Date.now() + '-' + file.name;

          // Move the file with the new file name
          fs.rename(file.path, path.join(__dirname, '../uploads/' + filename));

          // Add to the list of photos
          photos.push({
              status: true,
              filename: filename,
              type: type.ext,
              publicPath: '../uploads/' + filename
          });
      } else {
          photos.push({
              status: false,
              filename: file.name,
              message: 'Invalid file type'
          });
          fs.unlink(file.path);
      }
  });

  form.on('error', function(err) {
      console.log('Error occurred during processing - ' + err);
  });

  // Invoked when all the fields have been processed.
  form.on('end', function() {
      console.log('All the request fields have been processed.');
  });

  // Parse the incoming form fields.
  form.parse(req, function (err, fields, files) {
      res.status(200).json(photos);
  });
});






};
