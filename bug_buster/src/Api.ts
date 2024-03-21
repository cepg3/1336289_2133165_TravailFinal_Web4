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
				return false;
			});
	}

	static async isUsernameTaken(username: string): Promise<boolean> {
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
				return false;
			});
	}
}

export default api;
