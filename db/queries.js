const pool = require("./pool");

async function queryAllGames() {
  const { rows } = await pool.query("SELECT * FROM games;");
  return rows;
}

async function queryGame(id) {
  const query = await pool.query("SELECT * FROM games WHERE id = ($1) ;", [id]);
  const game = query.rows[0];
  return game;
}

async function queryByGenre(genre) {
  const { rows } = await pool.query(
    "SELECT * FROM games WHERE genre = ($1) ;",
    [genre]
  );
  return rows;
}

async function updateEntry(game) {
  await pool.query(
    "UPDATE games SET name = ($1), genre = ($2), platforms = ($3), release_yr = ($4) WHERE id = ($5) ;",
    [game.name, game.genre, game.platforms, +game.release_yr, +game.id]
  );
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

async function deleteGameFromDB(id) {
  await pool.query("DELETE FROM games WHERE id = ($1) ;", [id]);
}

module.exports = {
  queryByGenre,
  queryByPlatform,
  addGameToDB,
  queryAllGames,
  queryGame,
  updateEntry,
  deleteGameFromDB,
};
