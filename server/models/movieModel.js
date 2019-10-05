const db = require("../../db/mongodb/index.js");

module.exports = {
  addFavorite: movie => {
    return db.UserFav.findOneAndUpdate({ id: movie.id }, movie, { upsert: true, new: true })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  deleteFavorite: deletedMovie => {
    return db.UserFav.deleteOne({ id: deletedMovie.id })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  getFavorite: () => {
    return db.UserFav.find()
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
