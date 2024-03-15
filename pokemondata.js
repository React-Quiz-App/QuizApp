const axios = require('axios');

let pokemons = [];
let nextId = pokemons.length + 1;

const getPokemons = async () => {
  try {
    const response = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=16'
    );
    const data = response.data;
    pokemons = data.results.map((pokemon, index) => ({
      id: index + 1,
      name: pokemon.name,
      species: 'pokemon',
      url: pokemon.url,
    }));
    return pokemons;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return [];
  }
};

const removePokemon = (pokemonId) => {
  const id = pokemons.findIndex((pokemon) => pokemon.id === pokemonId);
  console.log('Index of pokemon with ID:', id);
  if (id < 0) throw new Error('Pokemon Not Found');
  pokemons.splice(id, 1);
};

module.exports = {
  getPokemons,
  removePokemon,
};
