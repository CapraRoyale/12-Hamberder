// Dependencies:
// Express helps create cleaner code for making servers in Node.js
var express = require("express");
// Router is a specific sub-method of express that makes routing HTTP traffic cleaner
var router = express.Router();
// Import our burger.js model that interfaces with our ORM to send requests and receive callbacks
var burger = require("../models/burger.js");

// Using our Express Router method to listen for traffic at our root directory,
// and make a GET request to grab database contents
router.get("/", function(req, res) {
    // Use our Burger.js model to send a request to the db and retrieve all entries in the table
    burger.selectAll(function(data) {
        // create a temporary variable to contain all of our retrieved data as an object and assign it to the key "burgers"
        var hbsObject = {
            burgers: data
        };
        // USe Handlebars on our backend to rend the data via the index.handlebars file
        res.render("index", hbsObject);
    });
});

// Use our Express Router method object to listen for a POST request to add a burger to the database
router.post("/", function(req, res) {
    // Log the burger name variable to the console to verify our rquest is operating as intended
    console.log(req.body.burger_name);
    // Create a condition that if the burger_name variable in the body of the HTTP request is NOT empty,
    // then insert the value into the database, being sure to .trim() whitespace (unecessary whitespace) around the entry
    if (req.body.burger_name !== "") {
        burger.insertOne(req.body.burger_name.trim(), function() {
            // redirect the response back to the root directory
            res.redirect("/");
        });
    }
});

// Use our Express Router method object to put (in this case, update) an entry in the database according to it's MySQL ID
router.put("/:id", function(req, res) {
    // Log that ID to the console for verification
    console.log(req.params.id);
    // Use our burger.js mdoel to update a single entry vis the above method
    burger.updateOne(req.params.id, function() {
        // then redirect the user to the root directory
        res.redirect("/");
    });
})

// Export our router object
module.exports = router;