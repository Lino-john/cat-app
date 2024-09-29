//import api from "./api";

import axios from "axios";
import api from "./api";
import { API_KEY } from "@env";

export const fetchCats = async () => {
  try {
    const response = await api.get("/images/search", {
      params: {
        limit: 10, // You can change this number to fetch more or fewer images
      },
    });
    return response.data;
  } catch (err) {
    console.log("fetchCats api error", err.response?.data || err.message);
    throw err; // Re-throw the error if you want to handle it elsewhere
  }
};

// Upload a new cat image
export const uploadCatImage = async (imageUri: string) => {
  let formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "cat.jpg",
  });

  const response = await api.post("/images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Vote on a cat (upvote or downvote)
export const voteCat = async (imageId: string, voteValue: number) => {
  console.log("Vote on cat'" + imageId);
  console.log("voteValue" + voteValue);

  console.log("process.env.CAT_API_KEY", API_KEY);
  try {
    const response = await api.post(
      "/votes",
      {
        image_id: imageId,
        value: voteValue, // 1 for upvote, 0 for downvote
        //sub_id: "user123", // Optional: Can be used to track votes by a user
      },
      {
        headers: {
          "x-api-key": "ylX4blBYT9FaoVd6OhvR", // Ensure your API key is passed in the header
        },
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "API request failed with status code:",
        err.response?.status
      );
      console.error("Error data:", err.response?.data);
    } else {
      console.error("Unknown error:", err.message);
    }
    throw err;
  }
};

// Favorite or unfavorite a cat
export const toggleFavoriteCat = async (catId: string, isFavorite: boolean) => {
  if (isFavorite) {
    // Unfavorite logic
    return await api.delete(`/favourites/${catId}`);
  } else {
    // Favorite logic
    return await api.post("/favourites", { image_id: catId });
  }
};
