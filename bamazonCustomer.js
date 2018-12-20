var inquirer = require("inquirer");
var mysql = require("mysql");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

// Your port
port: 8889,

// Your username
user: "root",

// Your password and databsase
password: "root",
database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as ID" + connection.threadId + "\n");
});
var products = [];
var display = function () {
    connection.query("SELECT id, product_name, price FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);

        for (var i = 0; i < results.length; i++) {
            products.push(results[i].id)
        }
        run(products);

    })
};

var run = function (products) {

    // once you have the products, prompt the user for which they'd like to purchase
    inquirer.prompt([
        {
            name: "productID",
            type: "input",
            message: "Enter the ID of the product you wish to purchase",

        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
        }
    ]).then(function (answer) {
        console.log(answer)

        var chosenProduct = answer.productID;

        console.log(chosenProduct);

        var sql = "SELECT stock_quantity, price, product_name FROM products WHERE id = ?"
        connection.query(sql, chosenProduct, function (err, results) {
            if (err) throw err;

            console.log("We have this many in stock" + results[0].stock_quantity);
            var price = results[0].price * parseInt(answer.quantity);


            if (results[0].stock_quantity > parseInt(answer.quantity)) {
                console.log("We have that in stock!");
                console.log("You're price is: " + price);
                var newStock = results[0].stock_quantity - parseInt(answer.quantity);
                var sql2 = "UPDATE products SET stock_quantity = ? WHERE product_name = ?"
                connection.query(sql2, [newStock, chosenProduct], function (error) {
                    if (error) throw err;
                    console.log("\n\n");
                    console.log("--------------------------------------------");
                    console.log("Product purchased successfully!");
                    console.log("--------------------------------------------");
                    console.log("Purchase Summary");
                    console.log("--------------------------------------------");
                    console.log("Item Name: " + results[0].product_name);
                    console.log("Item Count: " + parseInt(answer.quantity));
                    console.log("---------------------------------------------");
                    console.log("Total: " + "$" + price);
                    console.log("==============================================");
                    console.log("\n\n");
                    display();
                })
            } else {
                console.log("==============================================");
                console.log("Insufficient stock.");
                console.log("==============================================");
                display();
            }
        });
    });
}

display();
