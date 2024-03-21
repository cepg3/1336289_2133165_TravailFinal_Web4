import React, { useEffect, useRef } from "react";
import { UserContextType } from "../Login/UserContext";
import api from "../../Api";

export default function Game({
	gameCode,
	user,
	setUser,
	keepChecking,
	setKeepChecking,
}: {
	gameCode: string;
	user: UserContextType;
	setUser: (user: UserContextType) => void;
	keepChecking: boolean;
	setKeepChecking: (keepChecking: boolean) => void;
}) {
	useEffect(() => {
		// Makes sure the user doesn't exist in the database
		const checkUser = async () => {
			if (keepChecking) {
				console.log("Checking username : ", user.username);

				const response = await api
					.isUsernameTaken(user.username)
					.then(async (response) => {
						if (response) {
							console.log(
								"Username already taken : ",
								user.username
							);
							setUser({ username: "", id: null });
							return false;
						}

						// Creates the user if it doesn't exist
						const newUser = await api.createPlayer(user.username);
						setUser({ username: newUser.username, id: newUser.id });

						setKeepChecking(false);
						console.log("Stopped username verification");

						return true;
					});

				if (response) {
					console.log("User created : ", user.username);
				}

				// Creates the game
				const newGame = await api
					.doesGameExist(gameCode)
					.then(async (response) => {
						if (!response) {
							console.log("Creating game : ", gameCode);
							const newGame = await api.createGame(gameCode);
							console.log("Game created : ", gameCode);
							return newGame;
						}

						return await api.getGame(gameCode);
					});

				// Adds the user to the game
				await api.joinGame(newGame.id, user.id as number);
			}
		};

		checkUser();
	}, [user, keepChecking, setKeepChecking, setUser, gameCode]);

	return <div>Game</div>;
}
