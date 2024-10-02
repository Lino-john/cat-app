import { useEffect, useState } from "react";
import { fetchCats } from "@/services/api";

export const useCats = () => {
  const [cats, setCats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCats = async () => {
    try {
      const fetchedCats = await fetchCats();
      setCats(fetchedCats);
    } catch (err) {
      setError("Failed to load cats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  const handleVote = (catId: string, voteValue: number) => {
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === catId ? { ...cat, score: cat.score + voteValue } : cat
      )
    );
  };

  const handleFavorite = (catId: string, isFavorite: boolean) => {
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === catId ? { ...cat, isFavorite: !isFavorite } : cat
      )
    );
  };

  const addNewCat = (newCat: any) => {
    setCats((prevCats) => {
      return [newCat, ...prevCats];
    });
  };

  return {
    cats,
    loading,
    error,
    handleVote,
    handleFavorite,
    getCats,
    addNewCat,
  };
};
