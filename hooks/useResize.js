import { useEffect, useState } from "react";

export default function useRisize() {
	const isClient = typeof window === "object";

	// eslint-disable-next-line no-unneeded-ternary
	const [isPhone, setIsPhone] = useState(!!(isClient && window?.innerWidth > 600));

	const handleResize = () => {
		if (isClient && window.innerWidth > 600) setIsPhone(true);
		else setIsPhone(false);
	};

	useEffect(() => {
		handleResize();
		if (isClient) {
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}
	}, [isClient]);
	return { isPhone };
}
