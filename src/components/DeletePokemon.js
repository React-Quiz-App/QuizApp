const axios = require('axios');
import React from 'react';

const DeletePokemon = ({ pokemonId, handleDelete }) => {
  const deletePokemon = async () => {
    try {
      await axios.delete(`/api/pokemons/${pokemonId}`);
      handleDelete(pokemonId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button className="delete-pokemon" onClick={deletePokemon}>
      Delete Pokemon
    </button>
  );
};

export default DeletePokemon;
