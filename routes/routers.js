const { Router } = require("express");
const {
  getGamesByGenre,
  getGamesByPlatform,
} = require("../controllers/controllers");

const genreRouter = Router();
const platformRouter = Router();

genreRouter.get("/:genre", getGamesByGenre);
platformRouter.get("/:platform", getGamesByPlatform);

module.exports = { genreRouter, platformRouter };
