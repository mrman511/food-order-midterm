const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

module.exports = (db) => {
  router.get("/", (req, res) => {
    //console.log(req.params.id);
    const orderID = req.cookies['order_id'];
    const values = [orderID];
    const queryString = `SELECT food.image as image,
                         food.title as title,
                         food.id,
                         SUM(food.price) as total_price,
                         COUNT(food.id) as food_count
                         FROM orders
                         JOIN food_orders
                         ON orders.id = food_orders.order_id
                         JOIN food
                         ON food.id = food_orders.food_id
                         WHERE orders.id = $1
                         GROUP BY food.id;`
    db.query(queryString, values)
      .then((data) => {
        const food = data.rows;
        let totalCost = 0;
        for (item of data.rows){
          totalCost += parseInt(item.total_price);
        }
        console.log('CART FOOD DATA ROWS: ', { food, totalCost });
        res.render("03_cart", { food, totalCost });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/food-count", (req, res) => {
    const queryString = `
    SELECT COUNT(food_id),food_orders_id
    FROM food_orders
    JOIN orders
    ON order_id = orders.id
    WHERE orders.id = $1
    ;`;
    const values = req.cookies["order_id"];

    db.query(queryString, values).then((response) => {
      res.send(response.rows);
    });
  });

  return router;
};

// -get menu
// -get food items from orders
// -get checkout

// -post food item to orders
// -post add increase counter

// -post delete food item from orders
// -post decrease counter
