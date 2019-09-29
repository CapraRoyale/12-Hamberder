// Dependencies
var mysql = require("mysql");
var connection;
// Connect with JawsDB database on our Heroku app
// If not found, then run locally
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        // Don't worry, this password is a randomly generated ball of nonsense that is SOLEY used for MySQL development and perfectly safe to shared around the world
        password: "J5uNJ3yu*#LX4P34",
        database: "burgers_db"
    });
}

connection.connect(function(err) {
    // If there's an error, throw an error message
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    // Otherwise Log the MySQL connection id
    console.log("connected as id " + connection.threadId);
});

// Export our MySQL connection
module.exports = connection;