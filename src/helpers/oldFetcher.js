const fetcher = async (setState, path, args) => {
  try {
    const resp = await fetch(`http://localhost:4000/${path}`, args);
    const { status, data } = await resp.json();

    if (status === 'ok') {
      setState(data);
    } else {
      setState([]);
    }
  } catch (error) {
    setState([]);
    console.log('Todo mal');
  }
};
export default fetcher;
