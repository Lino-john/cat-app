import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

export default function CatCard({ cat, onVote, onFavorite }) {
  console.log("CatCard", cat);
  return (
    <View style={styles.card}>
      <Image source={{ uri: cat.url }} style={styles.image} />
      <Text>Score: {cat.score}</Text>
      <Button title="Vote Up" onPress={() => onVote(cat.id, 1)} />
      <Button title="Vote Down" onPress={() => onVote(cat.id, -1)} />
      <Button
        title={cat.isFavorite ? "Unfavorite" : "Favorite"}
        onPress={() => onFavorite(cat.id, cat.isFavorite)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
});
