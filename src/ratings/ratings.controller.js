const path = require("path");
const ratings = require(path.resolve("src/data/ratings-data"));

function ratingExists(req, res, next) {
  const ratingId = Number(req.params.ratingId);
  const foundRating = ratings.find((rating) => rating.id === ratingId);

  if (foundRating) {
    res.locals.rating = foundRating;
    next();
  } else {
    next({
      status: 404,
      message: `Rating id not found: ${req.params.ratingId}`,
    });
  }
}

function list(req, res) {
  const noteId = Number(req.params.noteId);

  if (noteId) {
    const foundRatings = ratings.filter((rating) => rating.noteId === noteId);
    console.log("list is running!");
    return res.status(200).json({ data: foundRatings });
  }

  res.status(200).json({ data: ratings });
}

function read(req, res, next) {
  const noteId = Number(req.params.noteId);

  if (noteId) {
    const foundRatings = ratings.filter((rating) => rating.noteId === noteId);
    const matchedRating = foundRatings.find(
      (rating) => rating.id === res.locals.rating.id
    );
    if (matchedRating) {
      console.log("read is running!");
      return res.status(200).json({ data: res.locals.rating });
    } else {
      next({
        status: 404,
        message: `Rating ID ${res.locals.rating.id} does not match any rating associated with Note ID ${noteId}`,
      });
    }
  }

  res.json({ data: res.locals.rating });
}

module.exports = {
  list,
  read: [ratingExists, read],
};
