import { useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';

export const useGetExperienceOpinion = (ticket) => {
  const [dataReview, setDataReview] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetcher(
      setDataReview,
      setError,
      setLoading,
      `ratingExp?ticket=${ticket}`,
      {}
    );
  }, [ticket]);

  return { dataReview, loading, error };
};
