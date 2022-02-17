const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
const cookieSession = require("cookie-session");
router.use(
  cookieSession({
    name: "order_id",
    keys: ["Aura smells like wet dog", "Toothless is so ruthless"],
  })
);
router.use(cookieParser());

module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`SELECT food.* FROM food`)
      .then((data) => {
        const menu = data.rows;
        const drinks = [];
        const mains = [];
        const appetizers = [];

        for (let item in menu) {
          if (menu[item].category === "drinks") {
            drinks.push(menu[item]);
          } else if (menu[item].category === "appetizers") {
            appetizers.push(menu[item]);
          } else {
            mains.push(menu[item]);
          }
        }
        console.log(drinks);
        res.status(200).render("02_menu", { drinks, appetizers, mains });
      })

      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/add/:id", (req, res) => {
    console.log("INSIDE THE ADD ROUTE BITCHES");
    const queryString = `INSERT INTO food_orders (order_id, food_id)
                        VALUES ($2, $1)`;

    const values = [req.params.id, req.cookies["order_id"]];
    db.query(queryString, values).then((response) => {
      res.send() ;
      //res.render('02_menu');
    })
  });

  router.post("/minus/:id", (req, res) => {
    const queryString = `DELETE FROM food_orders
                        WHERE order_id = $2
                        AND food_id = $1`;
    const values = [req.params.id, req.cookies["order_id"]];
    db.query(queryString, values)
      .then((data) => {
        res.send();
        //res.render('02_menu');
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  });

  router.get("/food_count", (req, res) => {
    console.log("inside food count path");
    const queryString = `SELECT food_id, COUNT(food_id) as food_count
                       FROM orders JOIN food_orders
                       ON order_id = orders.id
                       WHERE orders.id = $1
                       GROUP BY food_id`;
    const values = [req.cookies["order_id"]];
    console.log("/food-count values:", values);
    db.query(queryString, values).then((response) => {
      console.log(response.rows);
      res.send(response.rows);
    });
  });

  console.log('Yay boyyyy');
  return router;
};

// <!-- menu -->

// -get food items by category for menu
// -get route for drinks
// -get route for appetizers
// -get route for main
// -get route to cart

// -post food item to orders
// -post add increase counter

// -post delete food item from orders
// -post decrease counter
