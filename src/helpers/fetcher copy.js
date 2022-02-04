const fetcher = async (setState, setError, path, args) => {
  try {
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
};
export default fetcher;
