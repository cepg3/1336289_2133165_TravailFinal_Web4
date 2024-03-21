import React, { useEffect, useRef } from "react";
import { UserContextType } from "../Login/UserContext";
import api from "../../Api";

export default function Game({
	gameCode,
	user,
	onUserChange,
	setKeepChecking,
}: {
	gameCode: string;
	user: UserContextType;
	onUserChange: (user: UserContextType) => void;
	setKeepChecking: (keepChecking: boolean) => void;
}) {
	useEffect(() => {
		// Creates the user in the api

		// Stops checking that the username is taken because the user will have joined a game
		setKeepChecking(false);
		console.log("Stopped username verification");


	}, []);

	return <div>Game</div>;
}
