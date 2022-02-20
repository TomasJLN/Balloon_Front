//Para comprobar si un archivo existe en la ruta especificada

export const checkIfFileExists = (file) => {
  const img = new Image();
  img.src = file;

  if (img.complete) return true;
  else if (img.onload) return true;
  else return false;
};
