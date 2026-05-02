const normalizeAuth = (args) => {
  const auth = args?.headers?.Authorization;
  if (!auth || auth.startsWith('Bearer ')) return args;
  return { ...args, headers: { ...args.headers, Authorization: `Bearer ${auth}` } };
};

const fetcher = async (setState, setError, setLoading, path, args) => {
  try {
    setLoading(true);
    const resp = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${path}`,
      normalizeAuth(args)
    );
    const { status, message, data } = await resp.json();

    if (status === 'ok') {
      setState(data);
      setError(null);
      // console.log(data);
    } else {
      setState('');
      setError(message);
      // console.log("mensaje error con respuesta ->", message);
    }
  } catch (error) {
    setState('');
    setError('Algo salió muy mal!');
    // console.log("mensaje error sin respuesta ->", error);
    // console.log("Todo mal, no iniciaste el backend o no tienes el .env....");
  }
  setLoading(false);
};
export default fetcher;

// ****************************************************************** //

export const miniFetcher = async (path, args) => {
  let res = [];
  try {
    const resp = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${path}`,
      normalizeAuth(args)
    );
    const { status, message, data } = await resp.json();

    if (status === 'ok') {
      res = data;
    } else {
      res = message;
      // console.log('mensaje error con respuesta ->', message);
    }
  } catch (error) {
    res = error;
    // console.log('mensaje error sin respuesta ->', error);
  }
  return res;
};
