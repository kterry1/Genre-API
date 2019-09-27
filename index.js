const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  {id: 1, genre: 'Thriller'},
  {id: 2, genre: 'Suspense'},
  {id: 3, genre: 'Comedy'}
];

app.get('/', (req, res) => {
  res.send('Welcome to Vidly!');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send("The genre with the given ID does not exist.");
  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genre.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send("The genre with the given ID does not exist.");

  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(course);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(genre, schema);
};

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send("The genre with the given ID does not exist.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))
