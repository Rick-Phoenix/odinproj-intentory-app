const pool = require("./pool");

async function queryAllGames() {
  const { rows } = await pool.query("SELECT * FROM games;");
  return rows;
}

async function queryByGenre(genre) {
  const { rows } = await pool.query("SELECT * FROM games WHERE genre = ($1)", [
    genre,
  ]);
  return rows;
}

async function queryByPlatform(platform) {
  const parsedPlatform = platform === "Switch" ? "Nintendo Switch" : platform;
  const { rows } = await pool.query(
    "SELECT * FROM games WHERE ($1) = ANY (platforms);",
    [parsedPlatform]
  );
  return rows;
}

async function addGameToDB(game) {
  await pool.query(
    "INSERT INTO games (name, genre, platforms, release_yr) VALUES ($1, $2, $3, $4)",
    [game.name, game.genre, game.platforms, game.release_yr]
  );
}

module.exports = {
  queryByGenre,
  queryByPlatform,
  addGameToDB,
  queryAllGames,
};
