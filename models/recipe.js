const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    ingredients: [String],
    steps: [String]
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;