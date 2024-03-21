import React, { useEffect, useRef } from "react";
import { UserContextType } from "../Login/UserContext";
import api, { PlayerType } from "../../Api";

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

				const dbUser = await api
					.isUsernameTaken(user.username)
					.then(async (response) => {
						if (response) {
							console.log(
								"Username already taken : ",
								user.username
							);
							setUser({ username: "", id: null });
							return null;
						}

						// Creates the user if it doesn't exist
						const newUser = await api.createPlayer(user.username);
						setUser({ username: newUser.username, id: newUser.id });

						setKeepChecking(false);
						console.log("Stopped username verification");

						return newUser;
					})
					.then(async (response) => {
						if (response != null) {
							console.log("User created : ", user.username);
						}

						return response;
					});

				if (dbUser != null) {
					// Makes sure the game exists
					await api
						.doesGameExist(gameCode)
						.then(async (response) => {
							if (!response) {
								console.log("Creating game : ", gameCode);
								const newGame = await api.createGame(gameCode);
								console.log("Game created : ", gameCode);
								return newGame;
							}

							return await api.getGame(gameCode);
						})
						.then(async (response) => {
							if (response?.id != null && dbUser.id != null) {
								await api.joinGame(response.id, dbUser.id);
							}
						});
				}
			}
		};

		checkUser();
	}, [user, keepChecking, setKeepChecking, setUser, gameCode]);

	return <div>Game</div>;
}
