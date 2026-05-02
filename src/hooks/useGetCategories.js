import { useEffect, useState } from "react";
import fetcher from "../helpers/fetcher";

export const useGetCategories = (category = "", includeInactive = false) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetcher(
      setCategories,
      setError,
      setLoading,
      `filters/categories?title=${category}&includeInactive=${includeInactive ? "1" : "0"}`,
      {}
    );
    return () => {
      setCategories([]);
    };
  }, [category, includeInactive]);

  return { categories, loading, error };
};
