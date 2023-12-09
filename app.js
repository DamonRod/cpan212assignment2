const express = require('express');
const app = express();
const mongoose = require('mongoose');
const recipesRouter = require('./routes/recipes');

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/recipes', recipesRouter);

app.use((res) => {
  res.status(404).send('Not Found');
});

app.use((err, res) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
