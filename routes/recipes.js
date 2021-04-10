const express = require('express')
const router = express.Router()
const recipe = require('../models/recipes')


// Getting all
router.get('/', async (req, res, next) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }

  try {
    const recipes = await recipe.find(searchOptions)
    res.json(recipes)
  } catch {
    res.redirect('/')
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


// Getting One
router.get('/:id', getrecipe, (req, res, next) => {
  res.json(res.arecipe)
})


// Updating One
router.post('/:id/edit', getrecipe, async (req, res, next) => {
  if (req.body.name != null) {
    res.arecipe.name = req.body.name
  }
  if (req.body.ingredients != null) {
    res.arecipe.ingredients = req.body.ingredients
  }
  if (req.body.instructions != null) {
    res.arecipe.instructions = req.body.instructions
  }
    if (req.body.author != null) {
    res.arecipe.author = req.body.author
  }
  try {
    const updatedrecipe = await res.arecipe.save()
    res.json(updatedrecipe)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.get('/:id/delete', getrecipe, async (req, res, next) => {
  try {
    await res.arecipe.remove()
    res.json({ message: 'Deleted recipe' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


async function getrecipe(req, res, next) {
  let arecipe
  try {
    arecipe = await recipe.findById(req.params.id)
    if (arecipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.arecipe = arecipe
  next()
}


module.exports = router