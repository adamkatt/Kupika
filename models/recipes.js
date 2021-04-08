  
const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    author: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    description: {
      type: String
    },
    ingredients: {
      type: [],
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    image_url: {
      type: String
    },
    tags: {
      type: []
    }
  },
  {
    collection: "recipes"
  }
)

module.exports = mongoose.model('recipe', recipeSchema)
