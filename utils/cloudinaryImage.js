import Resizer from "react-image-file-resizer";

const cloudinaryImage = (value, setField) => {
  const file = value?.files[0];

  const extensions = /(jpe?g|png)$/i;
  if (!extensions.test(file?.type)) {
    alert("El formato es invalido");
    return;
  }

  Resizer.imageFileResizer(
    file,
    800, // Nuevo ancho de la imagen
    800, // Nueva altura de la imagen
    "JPEG", // Formato de salida de la imagen (puedes cambiarlo según tus necesidades)
    100, // Calidad de compresión (0-100)
    0, // Rotación de la imagen (en grados, 0-360)
    base64 => {
      // El resultado es la imagen redimensionada y comprimida en formato base64
      setField("imagen", base64);
    },
    "base64" // Tipo de salida ('blob' o 'base64')
  );
};

export default cloudinaryImage;
