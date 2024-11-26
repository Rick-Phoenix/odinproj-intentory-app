const {
  queryByGenre,
  queryByPlatform,
  addGameToDB,
  queryAllGames,
} = require("../db/queries");
const { body, validationResult } = require("express-validator");

const adminAuth = [
  body("password").custom((value) => {
    if (value !== "password") throw new Error("Wrong Password.");
    else return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send("Wrong Password");
    } else {
      const games = await queryAllGames();
      return res.render("manage", { games: games });
    }
  },
];

async function getAllGames(req, res) {}

async function getGamesByGenre(req, res) {
  const genre = req.params.genre;
  const games = await queryByGenre(genre);
  res.render("result", { games: games, queryType: genre });
}

async function getGamesByPlatform(req, res) {
  const platform = req.params.platform;
  const games = await queryByPlatform(platform);
  res.render("result", { games: games, queryType: platform });
}

const inputValidation = [
  body("platforms")
    .isArray({ min: 1 })
    .withMessage("You must select at least one platform."),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new", { message: errors.array()[0].msg });
    } else {
      addGameToDB(req.body);
      res.render("new", {
        message: `Game ${req.body.name} added successfully.`,
      });
    }
  },
];

module.exports = {
  getGamesByGenre,
  getGamesByPlatform,
  inputValidation,
  adminAuth,
};
