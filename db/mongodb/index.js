const mongoose = require("mongoose");
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost:27017/badmovies", { useNewUrlParser: true });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to db...");
});

const UserSchema = mongoose.Schema({
  title: String,
  genre_ids: Array,
  id: Number,
  vote_average: Number,
  poster_path: String,
  overview: String,
  release_date: String
});

const UserFav = mongoose.model("UserFav", UserSchema);

module.exports.UserFav = UserFav;
