import React from 'react';
import pokemonImage from '../../public/pikachu.jpeg';
import DeletePokemon from './DeletePokemon';

const SinglePokemon = ({ pokemon, handleDelete }) => {
  const { id, name } = pokemon;

  return (
    <li className="single-pokemon">
      <div className="row">
        <div>
          <img className="pokemon-img" src={pokemonImage} alt={name} />
        </div>
      </div>
      <div className="row">
        <div>Name:</div>
        <div>{name}</div>
      </div>
      <div className="row">
        <div>ID:</div>
        <div>{id}</div>
      </div>
      <DeletePokemon pokemonId={id} handleDelete={handleDelete} />
    </li>
  );
};

export default SinglePokemon;
