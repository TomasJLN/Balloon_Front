const fetcher = async (setState, setError, path, args) => {
  try {
    const resp = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${path}`,
      args
    );
    const { status, message, data } = await resp.json();
    console.log(status);
    if (status === 'ok') {
      setState(data);
    } else {
      setError(message);
      console.log(message);
    }
  } catch (error) {
    console.log('Todo mal');
  }
};
export default fetcher;
