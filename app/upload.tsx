import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadCatImage } from "@/services/api";
import { useRouter } from "expo-router";
import { useCats } from "@/hooks/useCats";
import Button from "@/components/Button";

export default function UploadCatScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { addNewCat } = useCats();

  const pickAndUploadImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (result.canceled) return;
    const imageUri = result.assets[0]?.uri;
    setSelectedImage(imageUri);
    await uploadImage(imageUri);
  };

  const uploadImage = async (imageUri: string) => {
    if (!imageUri) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "cat.jpg",
      type: "image/jpeg",
    });

    try {
      const newCat = await uploadCatImage(imageUri);

      addNewCat(newCat);

      router.push("/");
    } catch (error: any) {
      console.error("Upload failed:", error);
      setError("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload a new cat image</Text>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <Button
        type="primary"
        title="Upload image"
        onPress={pickAndUploadImage}
        disabled={uploading}
      />
      {uploading && <Text>Uploading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
