const Sportscenter = require("../models/sportscenter.model.js");

// Create and Save a new sportscenter
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a sportscenter
  const sportscenter = new Sportscenter({
    coordinates: req.body.coordinates,
    name: req.body.name
  });

  // Save sportscenter in the database
  Sportscenter.create(sportscenter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the sportscenter."
      });
    else res.send(data);
  });
};

// Retrieve all sportscenters from the database.
exports.findAll = (req, res) => {
  Sportscenter.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sportscenters."
      });
    else res.send(data);
  });
};

// Find a single sportscenter with a sportscenterId
exports.findOne = (req, res) => {
  Sportscenter.findById(req.params.sportscenterId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found sportscenter with id ${req.params.sportscenterId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving sportscenter with id " + req.params.sportscenterId
        });
      }
    } else res.send(data);
  });
};

// Update a sportscenter identified by the sportscenterId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Sportscenter.updateById(
    req.params.sportscenterId,
    new Sportscenter(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found sportscenter with id ${req.params.sportscenterId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating sportscenter with id " + req.params.sportscenterId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a sportscenter with the specified sportscenterId in the request
exports.delete = (req, res) => {
  Sportscenter.remove(req.params.sportscenterId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found sportscenter with id ${req.params.sportscenterId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete sportscenter with id " + req.params.sportscenterId
        });
      }
    } else res.send({ message: `sportscenter was deleted successfully!` });
  });
};

// Delete all sportscenters from the database.
exports.deleteAll = (req, res) => {
  Sportscenter.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sportscenters."
      });
    else res.send({ message: `All sportscenters were deleted successfully!` });
  });
};
