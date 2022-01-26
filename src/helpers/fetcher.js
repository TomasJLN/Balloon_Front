const fetcher = async (setState, path, args) => {
  try {
    const resp = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${path}`,
      args
    );
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
