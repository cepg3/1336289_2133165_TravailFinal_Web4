import React, { useEffect, useRef } from "react";
import { UserContextType } from "../Login/UserContext";
import api from "../../Api";

export default function Game({
	gameCode,
	user,
	onUserChange,
	keepChecking,
	setKeepChecking,
}: {
	gameCode: string;
	user: UserContextType;
	onUserChange: (user: UserContextType) => void;
	keepChecking: boolean;
	setKeepChecking: (keepChecking: boolean) => void;
}) {
	useEffect(() => {
		// Makes sure the user doesn't exist in the database
		const checkUser = async () => {
			if (keepChecking) {
				console.log("Checking username : ", user.username);

				const response = await api.isUsernameTaken(user.username);
				if (response) {
					console.log("Username already taken : ", user.username);
					onUserChange({ username: "", id: null });
					return;
				}

				// If the user doesn't exist, creates it
				const newUser = await api.createPlayer(user.username);

				// Stops checking that the username is taken because the user will have joined a game
				setKeepChecking(false);
				console.log("Stopped username verification");
			}
		};

		checkUser();
	}, [user, setKeepChecking, onUserChange]);

	return <div>Game</div>;
}
