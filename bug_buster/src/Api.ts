import axios from "axios";

class api {
	static async doesGameExist(gameId: string): Promise<boolean> {
		return axios
			.get(`https://apirest.w4-michael.vtinyhosting.site/games/${gameId}/exists/`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				return response.data.exists;
			})
			.catch((error) => {
				console.error(error);
				alert(
					"Une erreur s'est produite lors de la vérification de la partie. Veuillez vérifier votre connexion Internet et à l'api et réessayer."
				);
				return true;
			});
	}

	static async isUsernameTaken(username: string): Promise<boolean> {
		if (username == null || username === "") {
			return false;
		}

		return axios
			.get(`https://apirest.w4-michael.vtinyhosting.site/players/${username}/taken/`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				return response.data.taken;
			})
			.catch((error) => {
				console.error(error);
				alert(
					"Une erreur s'est produite lors de la vérification du nom d'utilisateur. Veuillez vérifier votre connexion Internet et à l'api et réessayer."
				);
				return true;
			});
	}

	static async createGame(
		gameId: string,
		pointsToWin: number = 10
	): Promise<GameType> {
		return axios
			.post(
				`https://apirest.w4-michael.vtinyhosting.site/games/`,
				{
					join_code: gameId,
					points_to_win: pointsToWin,
				},
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				return response.data as GameType;
			})
			.catch((error) => {
				console.error(error);
				alert(
					"Une erreur s'est produite lors de la création de la partie. Veuillez vérifier votre connexion Internet et à l'api et réessayer."
				);
				return {} as GameType;
			});
	}

	static async createPlayer(username: string): Promise<PlayerType> {
		return axios
			.post(
				`https://apirest.w4-michael.vtinyhosting.site/players/`,
				{
					username: username,
				},
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				return response.data as PlayerType;
			})
			.catch(async (error) => {
				// Checks if the error is that the username is already taken
				return await api.getPlayer(username);
			});
	}

	static async joinGame(gameId: number, playerId: number): Promise<GameType> {
		return axios
			.patch(
				`https://apirest.w4-michael.vtinyhosting.site/games/${gameId}/join/`,
				{
					playerId: playerId,
				},
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				return response.data as GameType;
			})
			.catch((error) => {
				console.error(error);
				alert(
					"Une erreur s'est produite lors de la jointure de la partie. Veuillez vérifier votre connexion Internet et à l'api et réessayer."
				);
				return {} as GameType;
			});
	}

	static async startGame(gameId: number): Promise<GameType> {
		return axios
			.get(`https://apirest.w4-michael.vtinyhosting.site/games/${gameId}/start/`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				return response.data as GameType;
			})
			.catch((error) => {
				console.error(error);
				alert(
					"Une erreur s'est produite lors du démarrage de la partie. Veuillez vérifier votre connexion Internet et à l'api et réessayer."
				);
				return {} as GameType;
			});
	}

	static async getGame(gameId: string): Promise<GameType> {
		return axios
			.get(`https://apirest.w4-michael.vtinyhosting.site/games/${gameId}/by_join_code/`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				return response.data as GameType;
			})
			.catch((error) => {
				console.error(error);
				alert(
					"Une erreur s'est produite lors de la récupération de la partie. Veuillez vérifier votre connexion Internet et à l'api et réessayer."
				);
				return {} as GameType;
			});
	}

	static async updateGame(gameId: number, gameData: Partial<GameType>): Promise<GameType> {
		return axios
		  .patch(`https://apirest.w4-michael.vtinyhosting.site/games/${gameId}/`, gameData, {
			headers: {
			  Accept: "application/json",
			  "Content-Type": "application/json",
			},
		  })
		  .then((response) => {
			return response.data as GameType;
		  })
		  .catch((error) => {
			console.error("Erreur lors de la mise à jour du jeu :", error);
			alert(
			  "Une erreur s'est produite lors de la mise à jour de la partie. Veuillez vérifier votre connexion Internet et à l'api et réessayer."
			);
			return {} as GameType;
		  });
	  }
	  
	static getPlayers(gameId: number): Promise<PlayerType[]> {
		return axios
			.get(`https://apirest.w4-michael.vtinyhosting.site/games/${gameId}/players`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				return response.data as PlayerType[];
			})
			.catch((error) => {
				console.error(error);
				alert(
					"Une erreur s'est produite lors de la récupération des joueurs. Veuillez vérifier votre connexion Internet et à l'api et réessayer."
				);
				return [] as PlayerType[];
			});
	}

	static async isGameFinished(gameId: number): Promise<boolean> {
		//TODO
		return false;
	}

	static async getGameWinnerUsername(gameId: number): Promise<string> {
		//TODO
		return "";
	}

	static async getPlayer(username: string): Promise<PlayerType> {
		return axios
			.get(`https://apirest.w4-michael.vtinyhosting.site/players?username=${username}`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				return response.data[0] as PlayerType;
			})
			.catch((error) => {
				console.error(error);
				alert(
					"Une erreur s'est produite lors de la récupération du joueur. Veuillez vérifier votre connexion Internet et à l'api et réessayer."
				);
				return {} as PlayerType;
			});
	}

	// Function to get player using the player id
	static async getPlayerById(playerId: number): Promise<PlayerType> {
		return axios
			.get(`https://apirest.w4-michael.vtinyhosting.site/players/${playerId}/`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				return response.data as PlayerType;
			})
			.catch((error) => {
				console.error(error);
				alert(
					"Une erreur s'est produite lors de la récupération du joueur. Veuillez vérifier votre connexion Internet et à l'api et réessayer."
				);
				return {} as PlayerType;
			});
	}

	static async setPlayerIsInGame(id: number): Promise<PlayerType> {
		return axios
			.patch(
				`https://apirest.w4-michael.vtinyhosting.site/players/${id}/`,
				{
					is_in_game: true,
				},
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				return response.data as PlayerType;
			})
			.catch((error) => {
				console.error(error);
				alert(
					"Une erreur s'est produite lors de la mise à jour du joueur. Veuillez vérifier votre connexion Internet et à l'api et réessayer."
				);
				return {} as PlayerType;
			});
	}

	// Function to get cards from a player in a game
	static async getPlayerCards(playerId: number): Promise<GameCardType[]> {
		return (
			(await axios.get(`https://apirest.w4-michael.vtinyhosting.site/players/${playerId}/`))
				.data as PlayerType
		).cards;
	}

	// Function to get cards from the game
	static async getGameCards(gameId: number): Promise<GameCardType[]> {
		return (
			(await axios.get(`https://apirest.w4-michael.vtinyhosting.site/games/${gameId}/`)).data as GameType
		).cards;
	}
}

export interface GameType {
	id: number;
	join_code: string;
	payer_ids: number[];
	current_client_player_id: number;
	points_to_win: number;
	is_started: boolean;
	cards: GameCardType[];
}

export interface PlayerType {
	id: number;
	username: string;
	cards: GameCardType[];
	points: number;
}

export interface GameCardType {
	id: number;
	text: string;
	cardCategory: string;
}

export default api;
