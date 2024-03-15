import React from 'react';
import SinglePokemon from './SinglePokemon';

const PokemonList = ({ pokemons, handleDelete }) => {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <SinglePokemon
          key={pokemon.id}
          pokemon={pokemon}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default PokemonList;
