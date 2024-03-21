import axios from "axios";

class api {
	static async doesGameExist(gameId: string): Promise<boolean> {
		return axios
			.get(`http://localhost:8000/games/${gameId}/exists`, {
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
			.get(`http://localhost:8000/players/${username}/taken`, {
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
				`http://localhost:8000/games/`,
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
		//TODO
		return {} as PlayerType;
	}

	static async joinGame(gameId: string, username: string): Promise<GameType> {
		//TODO
		return {} as GameType;
	}

	static async startGame(gameId: string): Promise<GameType> {
		//TODO
		return {} as GameType;
	}

	static async getGame(gameId: string): Promise<GameType> {
		//TODO
		return {} as GameType;
	}

	static async getPlayers(gameId: string): Promise<PlayerType[]> {
		//TODO
		return [];
	}

	static async isGameFinished(gameId: string): Promise<boolean> {
		//TODO
		return false;
	}

	static async getGameWinnerUsername(gameId: string): Promise<string> {
		//TODO
		return "";
	}
}

interface GameType {
	id: number;
	join_code: string;
	payer_ids: number[];
	current_client_player_id: number;
	points_to_win: number;
}

interface PlayerType {
	//TODO
}

export default api;
