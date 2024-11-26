const {
  queryByGenre,
  queryByPlatform,
  addGameToDB,
  queryAllGames,
  queryGame,
  updateEntry,
  deleteGameFromDB,
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

async function editGame(req, res) {
  const gameid = +req.body.gameid;
  const game = await queryGame(gameid);
  res.render("edit", { game: game, message: null });
}

async function deleteGame(req, res) {
  const gameid = +req.body.gameid;
  await deleteGameFromDB(gameid);
  res.send("Game deleted successfully.");
}

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
  body("platforms").custom((value) => {
    if (!value) throw new Error("You must select at least one platform.");
    else return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new", { message: errors.array()[0].msg });
    } else {
      const game = { ...req.body };
      if (!Array.isArray(game.platforms)) {
        game.platforms = [game.platforms];
      }
      addGameToDB(game);
      res.render("new", {
        message: `Game ${game.name} added successfully.`,
      });
    }
  },
];

const inputValidationEdit = [
  body("platforms").custom((value) => {
    if (!value) throw new Error("You must select at least one platform.");
    else return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("edit", { message: errors.array()[0].msg });
    } else {
      const game = { ...req.body };
      if (!Array.isArray(game.platforms)) {
        game.platforms = [game.platforms];
      }
      updateEntry(game);
      res.render("edit", {
        game: game,
        message: `Game ${game.name} edited successfully.`,
      });
    }
  },
];

module.exports = {
  getGamesByGenre,
  getGamesByPlatform,
  inputValidation,
  adminAuth,
  editGame,
  inputValidationEdit,
  deleteGame,
};
