import React from "react";
import { View, FlatList, Button, Text } from "react-native";
import { useCats } from "../../hooks/useCats";
import CatCard from "../../components/CatCard";

export default function HomeScreen() {
  const { cats, loading, handleVote, handleFavorite } = useCats();

  if (loading) return <Text>Loading...</Text>;

  return (
    <View>
      <FlatList
        data={cats}
        renderItem={({ item }) => (
          <CatCard cat={item} onVote={handleVote} onFavorite={handleFavorite} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
