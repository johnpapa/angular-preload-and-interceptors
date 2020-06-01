const data = {
  movies: {
    data: [
      {
        id: 1,
        name: 'Mary Poppins',
        year: '1964',
        length: '2h 19min',
      },
      {
        id: 2,
        name: 'Mary Poppins Returns',
        year: '2018',
        length: '2h 10min',
      },
    ],
  },
};

const getMovies = () => {
  return data.movies;
};

module.exports = { getMovies };
