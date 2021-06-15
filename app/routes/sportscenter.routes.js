module.exports = app => {
    const sportscenter = require("../controllers/sportscenter.controller.js");
  
    // Create a new sportscenter
    app.post("/sportscenter", sportscenter.create);
  
    // Retrieve all sportscenter
    app.get("/sportscenter", sportscenter.findAll);
  
    // Retrieve a single sportscenter with sportscenterId
    app.get("/sportscenter/:sportscenterId", sportscenter.findOne);
  
    // Update a sportscenter with sportscenterId
    app.put("/sportscenter/:sportscenterId", sportscenter.update);
  
    // Delete a sportscenter with sportscenterId
    app.delete("/sportscenter/:sportscenterId", sportscenter.delete);
  
    // Create a new sportscenter
    app.delete("/sportscenter", sportscenter.deleteAll);
  };