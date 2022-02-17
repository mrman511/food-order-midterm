require("dotenv").config();
const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');
const { sendSMS } = require("../functions/sms");

module.exports = (db) => {
  router.get("/", (req, res) => {
        db.query(`INSERT INTO orders (order_time)
             VALUES ('2008-11-11')`)
      .then((data) => {
        sendSMS()
        const queryString = `UPDATE orders
                             SET complete = TRUE
                             WHERE id = $1;`;
        const value = [req.cookies['order_id']];
        db.query(queryString, value)
      })
      .then(() => {
        res.clearCookie("order_id");
        res.render("05_confirmation");
      })

      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/finish", (req, res) => {
    res.redirect('/')
  })

  return router;
};




