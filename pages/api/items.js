// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	const fs = require("fs/promises");
	const path = require("path");
	const filePath = path.join(process.cwd(), "/json", "/data.json");

	const data = await fs.readFile(filePath);
	res.status(200);
	return res.json(data);
}
