# Eetaburder

Mak berder. Eet burhder.

## Usage

[![image](https://github.com/CapraRoyale/12-Hamberder/blob/master/public/assets/img/Annotation%202019-09-29%20123626.png?raw=true)]()

1. Enter burder idea in box.

2. Click burderh button.

3. App adds borgar to freesh list.

4. Click burg in freesh list, burg is ate.

5. Burg shows up on Eat'd borgs. Is ate. No mor

## Requirements

- Allow user to add burgers
- Display existing and added burgers to the left-hand side of the app with a corresponding button
- Display 'devoured' burgers to the right-hand side of the app
- Store all burgers and their devoured state in a database (MySQL)

## Technologies Used

- HTML
  - Bootstrap
- JavaScript
  - Node
  - Express
  - Handlebars
- MySQL

## Code Explanation

- There's kinda' like, a LOT of data pass-thru's goin' on here. But let's see if we can clear it up a bit:   
  
  - We pull in Node.js' Express library and contain it in a Method Object called 'express', then we "launch" an instance of Express in another object we call "App". Presumably this is cleaner because the *express()* function is only a subsection of the greater express library (*thus uses less code overall*), and also allows us to refer to our active express object as *app*, which is arguably more concise.
    
    ```js
    var express = require("express");
    var app = express();
    ```
  
  - Then we start the server by telling it to "listen" for incoming traffic:
  
  - ```js
    app.listen(PORT, function() {
        console.log("Listening on PORT " + PORT);
    });
    ```
  
  - We create an instance of Express' Router methods to clean up our code a bit and make the routing functions more obvious, and seperate from our other express methods.
  
  - ```js
    var router = express.Router();
    ```
  
  - In the case of a 'GET' request to our  root directory, or "Home page", we send the request (*req*) to the *selectAll()* function of our 'burger' object.
  
  - ```js
    router.get("/", function(req, res) {
        burger.selectAll(function(data) {
            var hbsObject = {
                burgers: data
            };
            res.render("index", hbsObject);
        });
    });
    ```
  
  - The *burger.selectAll()* function then retrieves data from our SQL database via a Node.js dependency called *MySQL*
  
  - ```js
    var mysql = require("mysql");
    var connection = mysql.createConnection({

            host: "localhost",
            user: "root",
            password: "password",

            database: "burgers_db"
        });
    connection.connect(function(err) {
        if (err) {
            return;
        }
    });
    ```
  
  - We then import our controller code (*via burger.js*) that takes specific requests via our router object and responds with a specific function.
  
  - ```js
    var burger = {
        selectAll: function(cb) {
            orm.selectAll("burgers", function(res) {
                cb(res);
            });
        },
    }    
    ```
  
  - Our *burger* object references our ORM model which takes the specific request functions and executes a MySQL query to our database for the data we're attempting to retrieve
  
  - ```js
    var orm = {
        selectAll: function(tableInput, callback) {

            var queryString = "SELECT * from ??";
            connection.query(queryString, [tableInput], function(err, res) {

                if (err) {
                    throw err;
                }
                callback(res);

            });
        },
    ```
  
  - Assuming there is no error in the SQL query:
    
    - MySQL then responds with data via our:
    
    - *callback* parameter passing it through to:
    
    - *orm.selectAll()* which passes back through the callback (*cb*) function of:
    
    - *burger.selectAll*()  which then passes it through to our ***hbsObject*** in *router.get()*:
    
    - finally sending it to our *res* (*results*) parameter of *router*:
      
      - which then utilizes the *.render* function, which is an imported function of **Handlebars** that takes the data, and renders it to our *index.handlebars* file by way of our *main.handlebars* scaffold
      
      - FINALLY resulting in the homepage of our web-app loading
      
      - #PHEW!




