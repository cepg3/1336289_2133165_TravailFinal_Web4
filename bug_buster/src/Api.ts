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
				alert("Une erreur s'est produite lors de la vérification de la partie. Veuillez vérifier votre connexion Internet et à l'api et réessayer.");
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
				alert("Une erreur s'est produite lors de la vérification du nom d'utilisateur. Veuillez vérifier votre connexion Internet et à l'api et réessayer.");
				return true;
			});
	}
}

export default api;
