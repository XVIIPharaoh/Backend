const db = require("../models");
const courses = db.coursess;
const Op = db.Sequelize.Op;
// Create and Save a new courses
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a courses
  const courses = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  // Save courses in the database
  courses.create(courses)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the courses."
      });
    });
};
// Retrieve all coursess from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  courses.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving coursess."
      });
    });
  
};
// Find a single courses with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  courses.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find courses with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving courses with id=" + id
      });
    });
  
};
// Update a courses by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  courses.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "courses was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update courses with id=${id}. Maybe courses was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating courses with id=" + id
      });
    });
  
};
// Delete a courses with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  courses.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "courses was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete courses with id=${id}. Maybe courses was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete courses with id=" + id
      });
    });
  
};
// Delete all coursess from the database.
exports.deleteAll = (req, res) => {
  courses.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} coursess were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all coursess."
      });
    });
  
};
// Find all published coursess
exports.findAllPublished = (req, res) => {
  courses.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving coursess."
      });
    });
  
};