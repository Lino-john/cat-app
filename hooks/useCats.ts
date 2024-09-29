import { fetchCats, toggleFavoriteCat, voteCat } from "@/services/catService";
import { useState, useEffect } from "react";

export const useCats = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCats = async () => {
      setLoading(true);
      const data = await fetchCats();
      setCats(data);
      setLoading(false);
    };
    getCats();
  }, []);

  const handleVote = async (catId: string, voteValue: number) => {
    await voteCat(catId, voteValue);
    const updatedCats = cats.map((cat) =>
      cat.id === catId ? { ...cat, score: cat.score + voteValue } : cat
    );
    setCats(updatedCats);
  };

  const handleFavorite = async (catId: string, isFavorite: boolean) => {
    await toggleFavoriteCat(catId, isFavorite);
    const updatedCats = cats.map((cat) =>
      cat.id === catId ? { ...cat, isFavorite: !cat.isFavorite } : cat
    );
    setCats(updatedCats);
  };

  return { cats, loading, handleVote, handleFavorite };
};
