// Dependencies
// This is the code for our Homemade Object Relational Mapper
var connection = require("./connection.js");

// 	Here we pass in query parameters for all 3 methods, including callbacks, to receive the data from the model
var orm = {
    // Create a function to contain the MySQL query for selecting everything in our database
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * from ??";
        connection.query(queryString, [tableInput], function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    // Create a function to grab a single instance in our database
    insertOne: function(tableInput, columnName, burgerName, cb) {
        var queryString = "INSERT INTO ?? (??) VALUES (?)";
        connection.query(queryString, [tableInput, columnName, burgerName], function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    // Create a function to contain the MySQL query for updating a single entry in our database
    updateOne: function(tableInput, updateColumnName, updateRowVal, searchColumnName, searchRowVal, cb) {
        var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        connection.query(queryString, [tableInput, updateColumnName, updateRowVal, searchColumnName, searchRowVal], function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    }
};

// Export ORM model
module.exports = orm;