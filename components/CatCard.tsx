import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./CatCard.styles";
import Button from "./Button";

interface Cat {
  id: string;
  url: string;
  score: number;
  isFavorite: boolean;
}

interface CatCardProps {
  cat: Cat;
  onVote: (catId: string, voteValue: number) => void;
  onFavorite: (catId: string, isFavorite: boolean) => void;
}

const CatCard: React.FC<CatCardProps> = ({ cat, onVote, onFavorite }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: cat.url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.score}>Score: {cat.score}</Text>
        <TouchableOpacity onPress={() => onFavorite(cat.id, cat.isFavorite)}>
          <FontAwesome
            name={cat.isFavorite ? "heart" : "heart-o"}
            size={24}
            color={cat.isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Vote up"
          onPress={() => onVote(cat.id, 1)}
          type="primary"
          textColor="#fff"
        />
        <Button
          title="Vote down"
          onPress={() => onVote(cat.id, -1)}
          type="secondary"
          textColor="#fff"
        />
      </View>
    </View>
  );
};

export default CatCard;
