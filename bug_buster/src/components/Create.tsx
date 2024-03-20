import {
	Button,
	Card,
	CardActions,
	CardContent,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import api from "../Api";

export default function Create({
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

		if (!gameExists) {
			onGameCodeChange(gameCode);
			navigate("/game");
		} else {
			setShowModal(true);
			console.log("A game with the code already exists: ", gameCode);
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
						inputProps={{ maxLength: 6 }}
					/>
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<Button
						variant="contained"
						startIcon={<LoginIcon />}
						size="large"
						onClick={() => handleGameCodeChange(tempGameCode)}
					>
						Créer une partie
					</Button>
				</CardActions>
			</Card>

			<Dialog open={showModal} onClose={() => setShowModal(false)}>
				<DialogTitle>Une partie avec ce code existe déjà</DialogTitle>
				<DialogContent>
					<DialogContentText gutterBottom>
                        Veuillez choisir un autre code pour votre partie.
					</DialogContentText>
					<Button
						variant="contained"
						onClick={() => setShowModal(false)}
					>
						Fermer
					</Button>
				</DialogContent>
			</Dialog>
		</>
	);
}
