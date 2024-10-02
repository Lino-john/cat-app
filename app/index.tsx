import CatCard from "@/components/CatCard";
import { useCats } from "@/hooks/useCats";
import { router } from "expo-router";
import React from "react";
import { View, FlatList, Text } from "react-native";
import { styles } from "./HomeScreen.styles";
import Button from "@/components/Button";

export default function HomeScreen() {
  const { cats, loading, handleVote, handleFavorite } = useCats();

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      {cats.length === 0 ? (
        <>
          <Text style={styles.emptyMessage}>No images are available.</Text>
          <View style={{ marginTop: 20 }}>
            <Button
              title="Upload a cat image"
              onPress={() => router.push("/upload")}
              type="primary"
              textColor="#fff"
            />
          </View>
        </>
      ) : (
        <>
          <Button
            title="Upload a cat image"
            onPress={() => router.push("/upload")}
            type="primary"
            textColor="#fff"
          />
          <Text style={styles.title}>Uploaded Cats</Text>
          <FlatList
            data={cats}
            renderItem={({ item }) => (
              <CatCard
                cat={item}
                onVote={handleVote}
                onFavorite={handleFavorite}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        </>
      )}
    </View>
  );
}
