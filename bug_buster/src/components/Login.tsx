import React, { Component } from "react";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	TextField,
} from "@mui/material";

export class Login extends Component {
	render() {
		return (
			<>
				<Typography variant="h2" gutterBottom>
					BugBusters
				</Typography>
				<Card sx={{ padding: 2, maxWidth: 275, textAlign: "center" }}>
					<CardContent>
						<TextField
                            required
							label="Nom d'utilisateur"
                            size="medium"
						/>
					</CardContent>
					<CardActions sx={{ justifyContent: "center" }} >
						<Button variant="contained" startIcon={<LoginIcon />} size="large">
							Se connecter
						</Button>
					</CardActions>
				</Card>
			</>
		);
	}
}

export default Login;
