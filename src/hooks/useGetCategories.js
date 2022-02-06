import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useGetCategories = (category = '') => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetcher(
      setCategories,
      setError,
      setLoading,
      `filters/categories?title=${category}`,
      {}
    );
  }, [category]);

  return { categories, loading, error };
};
