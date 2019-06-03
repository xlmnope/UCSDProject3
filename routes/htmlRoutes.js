// Will be used to handle login and serve our pages

// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var fs = require('fs');
var formidable = require('formidable');
var readChunk = require('read-chunk');
var fileType = require('file-type');
//
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function (app) {
  //
  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  //
  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  //
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/adminLogin", function(req, res){
    if(req.user){
      res.redirect("/adminPage");
    }
    res.sendFile(path.join(__dirname, "../public/adminLogin.html"));
  });
  //
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/adminPage", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/adminPage.html"));
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