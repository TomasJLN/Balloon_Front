const fetcher = async (setState, setError, setLoading, path, args) => {
  try {
    setLoading(true);
    console.log(`${process.env.TEXT}`);
    const resp = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${path}`,
      args
    );
    const { status, message, data } = await resp.json();
    if (status === 'ok') {
      setState(data);
      console.log(data);
    } else {
      setError(message);
      console.log('mensaje error con respuesta', message);
    }
  } catch (error) {
    setError('Algo salió muy mal!');
    console.log('mensaje error sin respuesta', error);
    console.log('Todo mal, parece que no iniciaste el backend....');
  }
  setLoading(false);
};
export default fetcher;
