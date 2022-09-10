module.exports = app => {
    const coursess = require("../controllers/courses.controller.js");
    var router = require("express").Router();
    // Create a new courses
    router.post("/", coursess.create);
    // Retrieve all coursess
    router.get("/", coursess.findAll);
    // Retrieve all published coursess
    router.get("/published", coursess.findAllPublished);
    // Retrieve a single courses with id
    router.get("/:id", coursess.findOne);
    // Update a courses with id
    router.put("/:id", coursess.update);
    // Delete a courses with id
    router.delete("/:id", coursess.delete);
    // Delete all coursess
    router.delete("/", coursess.deleteAll);
    app.use('/api/coursess', router);
  };