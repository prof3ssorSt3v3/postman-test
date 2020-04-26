'use strict';
const express = require('express');
const router = express.Router();
const users = require('./data').users;
const movies = require('./data').movies;
const {
  authenticate,
  hashPass,
  uniqueEmail,
  createToken,
  findUser,
  validPass,
} = require('./utils');

//WARNING NOT SANITIZING USER or MOVIE DATA

//USER routes for registering and logging in
router.post('/users/register', uniqueEmail, hashPass, (req, res) => {
  //email is unique and the password has been hashed
  //register new user
  let newUser = {
    _id: Date.now(),
    email: req.body.email,
    password: req.body.hashedPassword,
  };
  users.push(newUser);
  res.status(201).send({ data: { _id: newUser._id, email: newUser.email } });
});

router.post('/users/tokens', findUser, validPass, (req, res) => {
  //user is logging in to get a token
  //middleware findUser adds `user` to req object
  //validPass will confirm password it is valid
  //we have a matching user, create the token
  let token = createToken(req.user._id);
  res.status(200).send({ data: { token } });
});

//MOVIE routes - all need a valid token: use authenticate
router.get('/movies', authenticate, (req, res) => {
  // GET /api/movies - send ALL the movies that belong to current user
  let userMovies = movies.filter(
    (movie) => movie.owner === parseInt(req.user._id)
  );
  res.status(200).send({ data: userMovies });
});

router.get('/movies/:id', authenticate, (req, res) => {
  // GET /api/movies/id - send the details about ONE movie
  // if the owner matches req.user.id
  let movieID = req.params.id;
  let movieMatch = movies.find(
    (movie) => movie._id === movieID && movie.owner === parseInt(req.user._id)
  );
  console.log(movieID, req.user._id);
  if (movieMatch) {
    res.status(200).send({ data: movieMatch });
  } else {
    res.status(400).send({
      error: { code: 147, message: 'No match for specified movie id.' },
    });
  }
});

router.post('/movies', authenticate, (req, res) => {
  // POST /api/movies - add a movie for current user
  let newMovie = {
    _id: [...Array(30)]
      .map((e) => ((Math.random() * 36) | 0).toString(36))
      .join(''),
    title: req.body.title,
    year: req.body.year,
    owner: parseInt(req.user._id),
  };
  movies.push(newMovie);
  res.status(201).send({
    data: { _id: newMovie._id, title: newMovie.title, year: newMovie.year },
  });
});

router.delete('/movies/:id', authenticate, (req, res) => {
  // DELETE /api/movies - delete a specific movie
  // user id from the token
  let movieID = req.params.id;
  let idx = movies.findIndex(
    (movie) => movie._id === movieID && movie.owner === parseInt(req.user._id)
  );
  if (idx > -1) {
    movies.splice(idx, 1);
    res.status(200).send({ data: { _id: movieID, message: 'Delete Success' } });
  } else {
    res.status(400).send({ error: { code: 258, message: 'Invalid movie id' } });
  }
});

module.exports = router;
