import AppHeader from "../AppHeader";
import LoginCard from "./LoginCard";
import React from "react";
import { UserContextType } from "./UserContext";
import { Grid } from "@mui/material";

function Login({
	user,
	onUserChange,
}: {
	user: UserContextType | null;
	onUserChange: (user: UserContextType) => void;
}) {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<AppHeader />
			</Grid>
			<Grid item xs={12}>
				<LoginCard user={user} onUserChange={onUserChange} />
			</Grid>
		</Grid>
	);
}

export default Login;
