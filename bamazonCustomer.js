var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as ID" + connection.threadId + "\n");
});

// Display all products
function displayItems() {
    console.log("Displaying all items...\n");
    connection.query("SELECT id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.log(`${"id: ", "product_name: ", "price: $"}`);
    });

    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter the ID of the product you wish to buy: ",
            name: "item_id",
        }, 
        {
            type: "input",
            message: "Quantity? ",
            name: "quantity",   
        }
    ])
}



// check if my store inventory has enough of the product to meet the customer's request

// If not, the app should log a phrase like "Insufficient quantity!", and then prevent the order from going through

// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.

// Once the update goes through, show the customer the total cost of their purchase.








