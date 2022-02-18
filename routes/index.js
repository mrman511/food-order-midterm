const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(
  cookieSession({
    name: "session",
    keys: ["Aura smells like wet dog", "Toothless is so ruthless"],
  })
);

module.exports = (db) => {
  // GET menu button
  router.get('/', (req, res) => {
    res.render('01_index');
  });

  router.get("/menu", (req, res) => {
    res.render("02_menu");
  });
  // Post menu button. Sets Cookie.
  router.post("/", (req, res) => {
    console.log("res.cookie: ", res.cookie);
  });

  return router;
};

//RENDER
//then { if cookie set count for menu items}
//then { check if there is a cookie, if no cookie set food # and return something}
//then { if something do not create table , if !something dont create table returning id}
//then { if id, set cookie with id }
