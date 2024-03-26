import React, { useState } from "react";
import { UserContextType } from "./UserContext";
import LoginIcon from "@mui/icons-material/Login";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginCard({
	user,
	onUserChange,
}: {
	user: UserContextType | null;
	onUserChange: (user: UserContextType) => void;
}) {
	const navigate = useNavigate();

	const [tempUsername, onTempUsernameChange] = useState<string>(
		user?.username || ""
	);
	const handleUserChange = (username: string) => {
		if (username == null || username === "") {
			setHasError(true);
			setTimeout(() => {
				setHasError(false);
			}, 50);
			setTimeout(() => {
				setHasError(true);
			}, 100);

			return;
		}

		onUserChange({
			username: tempUsername,
			id: null,
			is_in_game: false,
			is_client: false,
		});

		//Log the use
		console.log("User logged in: ", tempUsername);

		navigate("/dashboard");
	};

	const [hasError, setHasError] = useState<boolean>(false);

	return (
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
					id="username"
					required
					label="Nom d'utilisateur"
					value={tempUsername}
					size="medium"
					onChange={(e) => onTempUsernameChange(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleUserChange(tempUsername);
						}
					}}
					error={hasError}
				/>
			</CardContent>
			<CardActions sx={{ justifyContent: "center" }}>
				<Button
					variant="contained"
					startIcon={<LoginIcon />}
					size="large"
					onClick={() => handleUserChange(tempUsername)}
				>
					Se connecter
				</Button>
			</CardActions>
		</Card>
	);
}
