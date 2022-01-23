const fetcher = async (setState, path, args) => {
  try {
    const resp = await fetch(`http://localhost:4000/${path}`, args);
    const { status, data } = await resp.json();
    console.log(path, args);
    console.log(data);
    if (status === 'ok') {
      setState(data);
    } else {
      setState([]);
      console.log(data);
    }
  } catch (error) {
    setState([]);
    console.log('Todo mal');
  }
};
export default fetcher;
