const fetcher = async (setState, path, args) => {
  try {
    const resp = await fetch(`http://localhost:4000/${path}`, args);
    const { status, message, data } = await resp.json();
    // console.log(path, args);
    console.log('el status ' + status);
    if (status === 'ok') {
      setState(data);
    } else {
      setState(message);
      console.log(message);
    }
  } catch (error) {
    setState('Todo mal');
    console.log('Todo mal');
  }
};
export default fetcher;
