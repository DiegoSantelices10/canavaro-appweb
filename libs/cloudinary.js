import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY_CLOUD,
	api_secret: process.env.API_SECRET_CLOUD,
});

export const uploadImage = async filePath => {
	return await cloudinary.uploader.upload(filePath, {
		folder: "canavaro",
	});
};

export const updateImage = async filePath => {
	return await cloudinary.uploader.upload(filePath, {
		folder: "canavaro",
		public_id: "canavaro/canavaro/uyzgjxzorre1t3yvhvvj",
		overwrite: true,
	})
}

export const deleteImage = async id => {
	return await cloudinary.uploader.destroy(id);
};
