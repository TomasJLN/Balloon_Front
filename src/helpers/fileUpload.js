export const fileUpload = async (url, key, setError, file, token) => {
  const formData = new FormData();
  formData.append(key, file);
  try {
    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: token,
      },
      body: formData,
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      setError(await resp.json());
      return 'error';
    }
  } catch (error) {
    setError(error);
  }
};
