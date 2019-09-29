// Import our Object Relational Mapping js file as a method object
var orm = require("../config/orm.js");

// Create a burger object to contain our ORM methods
var burger = {
    //burger.selectAll is a function that takes in no argument, and simply returns all entries in the database
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    // burger.insertOne is a function that takes in one argument, the string object burgerName and returns a callback,
    // after entering the object as text into our database
    insertOne: function(burgerName, cb) {
        orm.insertOne("burgers", "burger_name", burgerName, function(res) {
            cb(res);
        });
    },
    // burger.updateOne is a function that takes in one argument, the integer object burgerId, and returns a callback,
    // after updating the coresponding entry into our database with the boolean value "devoured" being set to true
    updateOne: function(burgerId, cb) {
        orm.updateOne("burgers", "devoured", 1, "id", burgerId, function(res) {
            cb(res);
        });
    }
};

// Export
module.exports = burger;