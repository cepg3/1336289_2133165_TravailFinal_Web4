import { Button, Card, CardContent, Grid } from "@mui/material";
import React from "react";

function ChooseJoinOrCreate() {
	const [gameCode, setGameCode] = React.useState<string>("");
	const handleGameCodeChange = (gameCode: string) => {
		setGameCode(gameCode);
		console.log("Game code changed to: ", gameCode);
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
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Button variant="contained">
								Rejoindre une partie
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button variant="outlined">Créer une partie</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}

export default ChooseJoinOrCreate;
