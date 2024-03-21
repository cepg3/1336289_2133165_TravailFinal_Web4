import React, { useEffect, useRef } from "react";
import { UserContextType } from "../Login/UserContext";

export default function Game({
	gameCode,
	user,
	setKeepChecking,
}: {
	gameCode: string;
	user: UserContextType;
	setKeepChecking: (keepChecking: boolean) => void;
}) {
	useEffect(() => {
		setKeepChecking(false);
		console.log("Stopped username verification");
	}, []);

	return <div>Game</div>;
}
