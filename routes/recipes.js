const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.param('id', async (req, res, next, id) => {
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        req.recipe = recipe;
        next();
    } catch (err) {
        next(err);
    }
});

router.get('/add', (req, res) => {
    res.render('addrecipe');
});

router.post('/add', async (req, res) => {
    const recipe = new Recipe(req.body);

    try {
        const savedRecipe = await recipe.save();
        res.redirect(`/recipes/${savedRecipe._id}`);
    } catch (err) {
        res.render('addrecipe', {
            message: 'Error: ' + err
        });
    }
});

router.get('/:id', (req, res) => {
    res.render('recipe', { recipe: req.recipe });
});

router.get('/:id/edit', (req, res) => {
    res.render('editrecipe', { recipe: req.recipe });
});

router.post('/:id/edit', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect(`/recipes/${updatedRecipe._id}`);
    } catch (err) {
        res.render('editrecipe', {
            message: 'Error: ' + err,
            recipe: req.recipe
        });
    }
});

router.get('/:id/delete', (req, res) => {
    res.render('deleterecipe', { recipe: req.recipe });
});

router.post('/:id/delete', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.redirect('/recipes');
    } catch (err) {
        res.status(404).send('Recipe not found');
    }
});

module.exports = router;