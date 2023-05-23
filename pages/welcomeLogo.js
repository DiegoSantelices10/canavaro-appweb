import Image from "next/image";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
export default function WelcomeLogo() {
	return (
		<div className="w-full h-screen bg-zinc-900">
			<div className="w-auto h-screen flex justify-center items-center">
				<div className="animate-bounce">
					<Image src="/images/logocanavaro.png" width={170} height={170} alt="logo" />
				</div>
			</div>
		</div>
	);
}
