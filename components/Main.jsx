/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedPokemonCard } from "./pokemonCard";
import { Logo } from "./Logo";
import { usePokemon } from "../hooks/usePokemon";
import { PokemonDetailModal } from "./pokemonDetailModal";

export function Main() {
  //Hooks
  const { loading, getAllPokemons } = usePokemon();
  const insets = useSafeAreaInsets();
  //Local state
  const [pokemons, setPokemons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  //Handlers
  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setModalVisible(true);
  };

  //effects
  useEffect(() => {
    (async () => {
      const data = await getAllPokemons();
      setPokemons(data);
    })();
  }, []);

  //UI
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={{ marginBottom: 20 }}>
        <Logo />
      </View>
      {loading ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={(pokemon) => pokemon.id.toString()}
          renderItem={({ item, index }) => (
            <AnimatedPokemonCard
              pokemon={item}
              index={index}
              onPress={() => handleSelectPokemon(item)}
            />
          )}
        />
      )}
      <PokemonDetailModal
        visible={modalVisible}
        pokemon={selectedPokemon}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
