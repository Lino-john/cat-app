import React, { useState } from "react";
import { View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadCatImage } from "@/services/catService";
//import { uploadCatImage } from "../services/catService";

export default function UploadScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      await uploadCatImage(selectedImage);
      Alert.alert("Success", "Image uploaded successfully");
      navigation.navigate("index"); // Redirect to home after upload
    } catch (error) {
      Alert.alert("Error", "Failed to upload image");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Pick an image" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}
