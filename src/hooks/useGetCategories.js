import { useEffect, useState } from "react";
import fetcher from "../helpers/fetcher";

export const useGetCategories = (category = "") => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetcher(
      setCategories,
      setError,
      setLoading,
      `filters/categories?title=${category}`,
      {}
    );
    return () => {
      setCategories([]);
    };
  }, [category]);

  return { categories, loading, error };
};
