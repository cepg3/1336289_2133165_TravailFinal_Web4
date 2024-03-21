import React, { useEffect, useState } from "react";
import "../assets/css/App.css";
import { UserContextType } from "./Login/UserContext";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./Login/Login";
import PageNotFound from "./PageNotFound";
import Dashboard from "./Dashboard";
import Join from "./Join";
import Create from "./Create";
import Game from "./Game/Game";
import api from "../Api";
import {
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

function App() {
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<BrowserRouter>
				<Main setShowModal={setShowModal} />
			</BrowserRouter>
			{showModal ? (
				<Dialog open={showModal} onClose={() => setShowModal(false)}>
					<DialogTitle>Nom d'utilisateur déjà pris</DialogTitle>
					<DialogContent>
						<DialogContentText gutterBottom>
							Veuillez choisir un autre nom d'utilisateur.
						</DialogContentText>
						<Button
							variant="contained"
							onClick={() => setShowModal(false)}
						>
							Fermer
						</Button>
					</DialogContent>
				</Dialog>
			) : null}
		</div>
	);
}

function Main({ setShowModal }: { setShowModal: (show: boolean) => void }) {
	const location = useLocation();

	const [keepChecking, setKeepChecking] = useState<boolean>(true);

	const [user, setUser] = React.useState<UserContextType>({ username: "" });
	const handleUserChange = (user: UserContextType) => {
		console.log("User name changed to: ", user);
		setUser(user);
	};

	const [gameCode, setGameCode] = React.useState<string>("");
	const handleGameCodeChange = (gameCode: string) => {
		console.log("Game code changed to: ", gameCode);
		setGameCode(gameCode);
	};

	useEffect(() => {
		if (keepChecking) {
			const checkUser = async () => {
				console.log("Checking username : ", user.username);

				const response = await api.isUsernameTaken(user.username);
				if (response) {
					console.log("Username already taken : ", user.username);
					setShowModal(true);
					handleUserChange({ username: "" });
				}
			};

			checkUser();
		}

		console.log(api.getPlayer("allo"));
	}, [user, location, keepChecking]);

	if (user?.username != null && user?.username !== "") {
		return (
			<Routes>
				<Route
					path="/"
					element={
						<Login user={user} onUserChange={handleUserChange} />
					}
				/>
				<Route path="/dashboard" element={<Dashboard user={user} />} />
				<Route
					path="/join"
					element={
						<Join
							gameCode={gameCode}
							onGameCodeChange={handleGameCodeChange}
						/>
					}
				/>
				<Route
					path="/create"
					element={
						<Create
							gameCode={gameCode}
							onGameCodeChange={handleGameCodeChange}
						/>
					}
				/>
				<Route
					path="/game"
					element={
						<Game
							gameCode={gameCode}
							user={user}
							setKeepChecking={setKeepChecking}
						/>
					}
				/>

				<Route
					path="*"
					element={
						user?.username != null && user?.username !== "" ? (
							<PageNotFound />
						) : (
							<Login
								user={user}
								onUserChange={handleUserChange}
							/>
						)
					}
				/>
			</Routes>
		);
	} else {
		return <Login user={user} onUserChange={handleUserChange} />;
	}
}

export default App;
