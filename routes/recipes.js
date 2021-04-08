const express = require('express')
const router = express.Router()
const recipe = require('../models/recipes')


// Getting all
router.get('/', async (req, res, next) => {
  try {
    const recipes = await recipe.find()
    res.json(recipes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// POST - Create new recipe
router.post('/',  async (req, res, next) => {
  
  // create a recipe object with objects from the body

  const r = new recipe({
    name: req.body.name,
    author: req.body.author,
    date: req.body.date,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    image_url: req.body.image_url,
    tags: req.body.tags
  });

  // attempt to save the recipe, error if you cannot
  try {
    const newrecipe = await r.save()
    res.status(201).json(newrecipe)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

/*
// Getting One
router.get('/:id', getrecipe, (req, res) => {
  res.json(res.recipe)
})*/

/*
// Updating One
router.patch('/:id', getrecipe, async (req, res) => {
  if (req.body.name != null) {
    res.recipe.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.recipe.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedrecipe = await res.recipe.save()
    res.json(updatedrecipe)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getrecipe, async (req, res) => {
  try {
    await res.recipe.remove()
    res.json({ message: 'Deleted recipe' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
*/
async function getrecipe(req, res, next) {
  let recipe
  try {
    recipe = await recipe.findById(req.params.id)
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.recipe = recipe
  next()
}

module.exports = router