import Swal from "sweetalert2";
const cloudinaryImage = (value, setField) => {
	const file = value?.files[0];

	const reader = new FileReader();
	const extensions = /(jpe?g|png)$/i;
	if (!extensions.test(file.type)) {
		Swal.fire({
			icon: "error",
			title: "¡Formato no válido!",
			text: "Seleccione un formato .png o .jpg.",
		});
		return;
	}

	reader.onload = () => {
		const codeBase64 = reader.result;
		setField("imagen", codeBase64);
	};
	reader.readAsDataURL(file);
};

export default cloudinaryImage;
