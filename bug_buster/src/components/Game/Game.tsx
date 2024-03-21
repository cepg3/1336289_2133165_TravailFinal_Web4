import React, { useEffect, useRef } from "react";
import { UserContextType } from "../Login/UserContext";
import api, { GameType, PlayerType } from "../../Api";

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
	const [game, setGame] = React.useState<GameType | null>(null);

	useEffect(() => {
		// Makes sure the user doesn't exist in the database
		const checkUser = async () => {
			if (keepChecking) {
				console.log("Checking username : ", user.username);

				setGame(
					await api
						.isUsernameTaken(user.username)
						.then(async (response) => {
							if (response) {
								console.log(
									"Username already taken : ",
									user.username
								);
								return true;
							} else {
								const newUser = await api.createPlayer(
									user.username
								);
								setUser({
									username: user.username,
									id: newUser.id,
									is_in_game: true,
									is_client: true,
								});
								console.log("User created : ", user.username);
								return newUser;
							}
						})
						.then(async (userOrResponse) => {
							if (userOrResponse === true) {
								return await api.getPlayer(user.username);
							} else {
								return userOrResponse;
							}
						})
						.then(async (user) => {
							// Makes sure the game exists
							return await api
								.doesGameExist(gameCode)
								.then(async (gameExist) => {
									if (gameExist) {
										return await api.getGame(gameCode);
									} else {
										console.log(
											"Creating game : ",
											gameCode
										);
										return await api
											.createGame(gameCode)
											.then((newGame) => {
												if (newGame.id != null) {
													console.log(
														"Game created : ",
														gameCode
													);
													return newGame;
												}
												return null;
											});
									}
								})
								.then(async (nullOrNewGame) => {
									if (nullOrNewGame != null) {
										return await api.joinGame(
											nullOrNewGame.id,
											user.id
										);
									}
									return null;
								});
						})
				);
			}
		};

		checkUser();
	}, [user, keepChecking, setKeepChecking, setUser, gameCode]);

	return <div>Game</div>;
}
