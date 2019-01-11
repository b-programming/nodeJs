const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const movies = [
{"id": 1, "name": "movie1", "zanr": "grozlivka"},
{"id": 2, "name": "movie2", "zanr": "grozlivka"},
{"id": 3, "name": "movie3", "zanr": "komedija"},
{"id": 4, "name": "movie4", "zanr": "drama"},
{"id": 5, "name": "movie5", "zanr": "spanska drama"},
];
//validate funct
function validateMovie(movie) {
const schema = {
 name:Joi.string().min(3).required(),
 zanr:Joi.string().min(3).required()
};
return Joi.validate(movie, schema);
}

app.get('/', (req, res) => {
 res.send('yoyoyo');
});
app.get('/api/zanri', (req, res) => {
res.send(movies);
});
app.get('/api/zanri/:id', (req, res) => {
 const movie = movies.find(m => m.id === parseInt(req.params.id));
 if(!movie) return res.status(404).send('no matching id');
 res.send(movie);
});
app.post('/api/zanri', (req, res) => {
const { error } = validateMovie(req.body);
if(error) return res.status(400).send(result.error.details[0].message);

const movie = {
 id: movies.length + 1,
 name: req.body.name,
 zanr: req.body.zanr
};
 movies.push(movie);
 res.send(movie);
});
app.put('/api/zanri/:id', (req, res) => {
const movie = movies.find(m => m.id === parseInt(req.params.id));
if (!movie) return res.status(404).send('no matching id');

const { error } = validateMovie(req.body);
if (error) return res.status(400).send(error.details[0].message);

movie.name = req.body.name;
movie.zanr = req.body.zanr;
res.send(movie);
});
app.delete('/api/zanri/:id', (req, res) => {
const movie = movies.find(m => m.id === parseInt(req.params.id));
if(!movie) return res.status(404).send('no matching id');

const index = movies.indexOf(movie);
movies.splice(index, 1);
res.send(movie);
});
//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));
