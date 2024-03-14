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
		onUserChange({ username: tempUsername });
		navigate("/dashboard");
	};

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
