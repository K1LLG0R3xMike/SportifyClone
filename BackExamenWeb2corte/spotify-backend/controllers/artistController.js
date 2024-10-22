const Artist = require('../models/artist');

exports.getArtistsByGenre = async (req, res) => {
  const { genreId } = req.params;
  const artists = await Artist.find({ genre: genreId }).populate('songs');
  res.json(artists);
};

exports.getArtists = async (req, res) => {
  const artists = await Artist.find().populate('genre');
  res.json(artists);
}