const Genre = require('../models/genre');

exports.getGenres = async (req, res) => {
  const genres = await Genre.find().populate('artists');
  res.json(genres);
};
