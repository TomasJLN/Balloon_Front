import { useEffect, useState } from "react";
import fetcher from "../helpers/fetcher";

export const useExperience = (id = 1) => {
  const [experience, setExperience] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetcher(setExperience, setError, setLoading, `experience/${id}`, {});
  }, [id]);

  return experience;
};
