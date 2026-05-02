export const fileUpload = async (url, key, setError, file, token) => {
  const formData = new FormData();
  formData.append(key, file);
  try {
    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const contentType = resp.headers.get('content-type') || '';
      const error = contentType.includes('application/json')
        ? await resp.json()
        : { message: 'No se pudo subir la imagen. Revisa el tamaño del archivo.' };
      setError(error);
      return null;
    }
  } catch (error) {
    setError({ message: error.message || 'No se pudo conectar con el servidor.' });
    return null;
  }
};
