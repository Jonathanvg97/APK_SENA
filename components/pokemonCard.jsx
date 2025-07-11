/* eslint-disable prettier/prettier */
import { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  Pressable,
} from "react-native";

export function PokemonCard({ pokemon, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View key={pokemon.url} style={styles.card}>
        <Image source={{ uri: pokemon.image }} style={styles.image} />
        <Text style={styles.title}>{pokemon.name}</Text>
        <Text style={styles.description}>{pokemon.types.join(", ")}</Text>
      </View>
    </Pressable>
  );
}

export function AnimatedPokemonCard({ pokemon, index, onPress }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <PokemonCard pokemon={pokemon} onPress={onPress} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 42,
  },
  image: {
    width: 250,
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#eee",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
});
