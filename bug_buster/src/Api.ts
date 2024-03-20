import axios from "axios";

class api {
	static async doesGameExist(gameId: string): Promise<boolean> {
		return axios
			.get(`/game/${gameId}/exists`)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.error(error);
				return false;
			});
	}
}

export default api;