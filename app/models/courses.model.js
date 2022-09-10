module.exports = (sequelize, Sequelize) => {
  const courses = sequelize.define("courses", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });
  return courses;
};