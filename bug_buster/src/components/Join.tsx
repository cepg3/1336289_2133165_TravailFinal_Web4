import {
	Button,
	Card,
	CardActions,
	CardContent,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import api from "../Api";

export default function Join({
	gameCode,
	onGameCodeChange,
}: {
	gameCode: string;
	onGameCodeChange: (gameCode: string) => void;
}) {
	const navigate = useNavigate();

	const [showModal, setShowModal] = useState<boolean>(false);

	const [tempGameCode, onTempGameCodeChange] = useState<string>(
		gameCode || ""
	);
	const handleGameCodeChange = async (gameCode: string) => {
		const gameExists = await api.doesGameExist(gameCode);

		if (gameExists) {
			onGameCodeChange(gameCode);
			navigate("/game");
		} else {
			setShowModal(true);
			console.log("No game with the code: ", gameCode);
		}
	};

	return (
		<>
			<Card
				sx={{
					padding: 2,
					maxWidth: 275,
					textAlign: "center",
					margin: "auto",
				}}
			>
				<CardContent>
					<TextField
						id="gameCode"
						required
						label="Code de partie"
						value={tempGameCode}
						size="medium"
						onChange={(e) => onTempGameCodeChange(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleGameCodeChange(tempGameCode);
							}
						}}
					/>
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<Button
						variant="contained"
						startIcon={<LoginIcon />}
						size="large"
						onClick={() => handleGameCodeChange(tempGameCode)}
					>
						Se connecter
					</Button>
				</CardActions>
			</Card>

			<Dialog open={showModal} onClose={() => setShowModal(false)}>
				<DialogTitle>Aucune partie avec ce code</DialogTitle>
				<DialogContent>
					Veuillez vérifier le code de la partie et réessayer.
				</DialogContent>
			</Dialog>
		</>
	);
}
