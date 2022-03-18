import { useEffect, useState } from "react";
import fetcher from "../helpers/fetcher";

export const useFiltered = (experience = "") => {
	const [filtered, setFiltered] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetcher(setFiltered, setError, setLoading, `allFilter${experience}`, {});
	}, [experience]);

	return { filtered, loading, error };
};
