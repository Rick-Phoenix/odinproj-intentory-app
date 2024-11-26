require("dotenv").config();
const express = require("express");
const path = require("node:path");
const { genreRouter, platformRouter } = require("./routes/routers");
const {
  addGame,
  inputValidation,
  getAllGames,
  adminAuth,
  editGame,
  inputValidationEdit,
  deleteGame,
} = require("./controllers/controllers");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index"));
app.get("/new", (req, res) => res.render("new", { message: null }));
app.post("/new", inputValidation);
app.get("/auth", (req, res) => res.render("auth"));
app.post("/auth", adminAuth);
app.use("/genre", genreRouter);
app.use("/platform", platformRouter);
app.post("/edit", editGame);
app.post("/edit/send", inputValidationEdit);
app.post("/delete", deleteGame);

app.listen(3000);
