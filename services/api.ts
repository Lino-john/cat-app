import axios from "axios";

const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key": process.env.EXPO_PUBLIC_API_KEY,
  },
});

export default api;

export const fetchCats = async () => {
  try {
    const response = await api.get("/images?limit=10");
    const catsWithScores = response.data.map((cat: any) => ({
      ...cat,
      score: 0,
    }));

    return catsWithScores;
  } catch (err: any) {
    console.error("Failed to fetch cats:", err);
    throw err;
  }
};

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
