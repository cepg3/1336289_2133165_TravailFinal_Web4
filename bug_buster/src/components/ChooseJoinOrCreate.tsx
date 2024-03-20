import { Button, Card, CardContent, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function ChooseJoinOrCreate() {
	const navigate = useNavigate();
	
	const handleJoin = () => {
		navigate("/join");
	};

	const handleCreate = () => {
		navigate("/create");
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
							<Button variant="contained" onClick={handleJoin}>
								Rejoindre une partie
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button variant="outlined" onClick={handleCreate}>
								Créer une partie
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}

export default ChooseJoinOrCreate;
