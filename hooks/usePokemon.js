/* eslint-disable prettier/prettier */

import { useState } from "react";

export const usePokemon = () => {
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const getAllPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`
      );
      const pokemons = await response.json();

      const fullPokemons = await Promise.all(
        pokemons.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const data = await res.json();

          return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map((t) => t.type.name),
          };
        })
      );

      return fullPokemons;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getPokemon = async (id) => {
    setLoadingDetail(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon = await response.json();
      return pokemon;
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDetail(false);
    }
  };


  return { loading, getAllPokemons, loadingDetail, getPokemon };
};
