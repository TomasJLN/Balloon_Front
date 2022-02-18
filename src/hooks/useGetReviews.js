import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useGetReviews = (id) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetcher(setReviews, setError, setLoading, `review?searchByExp=${id}`, {});
  }, [id]);

  return { reviews, error, loading };
};
