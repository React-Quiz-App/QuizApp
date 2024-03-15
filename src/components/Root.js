import React from 'react';
import PokemonList from './PokemonList';

import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const Root = () => {
  const [pokemons, setPokemons] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { data } = await axios.get('/api/pokemons');
        setPokemons(data);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    };
    fetchPokemons();
  }, []);

  const handleDelete = (id) => {
    setPokemons(pokemons.filter((pokemon) => pokemon.id !== id));
  };

  if (error) return <div>Error</div>;

  if (!pokemons) return <div>Loading</div>;

  return (
    <>
      <h1>All Pokemons</h1>
      <PokemonList pokemons={pokemons} handleDelete={handleDelete} />
    </>
  );
};

export default Root;
