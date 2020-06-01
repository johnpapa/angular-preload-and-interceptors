const data = require('../shared/movie-data');

module.exports = async function (context, req) {
  try {
    const movies = data.getMovies();
    context.res.status(200).json(movies);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
