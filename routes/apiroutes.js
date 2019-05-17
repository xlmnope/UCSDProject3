var db = require("../models");

module.exports = function(app) {
  // get all items to show in UI
  app.get("/api/items", function(req, res) {
    db.Item.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
};
