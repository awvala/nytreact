const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  date: {
      type: String,
  },
  saved: {
    type: boolean,
    default: false,
  }
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
