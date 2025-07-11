/* eslint-disable prettier/prettier */
import { Modal, View, Text, Image, StyleSheet, Pressable } from "react-native";

export function PokemonDetailModal({ visible, pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.id}>#{pokemon.id}</Text>
          <Text style={styles.typesTitle}>Tipos:</Text>
          <Text style={styles.types}>{pokemon.types.join(", ")}</Text>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    width: "80%",
  },
  image: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    textTransform: "capitalize",
  },
  id: {
    fontSize: 16,
    color: "#888",
  },
  typesTitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
  types: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
