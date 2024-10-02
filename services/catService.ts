import axios from "axios";
import api from "./api";

export const voteCat = async (imageId: string, voteValue: number) => {
  try {
    const response = await api.post("/votes", {
      image_id: imageId,
      value: voteValue,
    });
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

export const toggleFavoriteCat = async (
  catId: string,
  isFavorite: boolean,
  favoriteId?: string
) => {
  if (isFavorite && favoriteId) {
    return await api.delete(`/favourites/${favoriteId}`);
  } else {
    const response = await api.post("/favourites", { image_id: catId });
    return response.data;
  }
};
