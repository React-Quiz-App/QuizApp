const express = require('express');
const morgan = require('morgan');
const { join } = require('path');
const { removePokemon, getPokemons } = require('./pokemondata');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');

const app = express();

// Body Parsing
app.use(express.json());

// Request/Response Logging
app.use(morgan('dev'));

// GET all the pokemons
app.get('/api/pokemons', async (req, res) => {
  try {
    const pokemons = await getPokemons();
    res.json(pokemons);
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE pokemon with the given id
app.delete('/api/pokemons/:id', (req, res) => {
  const id = Number(req.params.id);
  try {
    removePokemon(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error removing Pokémon:', error.message);
    res.status(404).send(error.message);
  }
});

// Webpack Dev Middleware
const compiler = webpack(webpackConfig);
app.use(
  middleware(compiler, {
    // publicPath: join(__dirname, "public"),
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true,
  })
);

// static file-serving middleware
app.use(express.static(join(__dirname, 'public')));

module.exports = app;
