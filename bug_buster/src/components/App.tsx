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

	const [userContext, setUserContext] = React.useState<UserContextType>({
		username: "",
		id: null,
		is_in_game: false,
		is_client: false,
	});
	const handleUserChange = (user: UserContextType) => {
		setUserContext(user);
	};

	const [gameCode, setGameCode] = React.useState<string>("");
	const handleGameCodeChange = (gameCode: string) => {
		setGameCode(gameCode);
	};

	useEffect(() => {
		if (keepChecking && !userContext?.is_in_game) {
			const checkUser = async () => {

				const response = await api.isUsernameTaken(
					userContext.username
				);
				if (response) {
					setShowModal(true);
				}
			};

			checkUser();
		}
	}, [userContext, location, keepChecking]);

	if (userContext?.username != null && userContext?.username !== "") {
		return (
			<Routes>
				<Route
					path="/"
					element={
						<Login
							user={userContext}
							onUserChange={handleUserChange}
						/>
					}
				/>
				<Route
					path="/dashboard"
					element={<Dashboard user={userContext} />}
				/>
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
							user={userContext}
							setUser={handleUserChange}
							keepChecking={keepChecking}
							setKeepChecking={setKeepChecking}
						/>
					}
				/>

				<Route
					path="*"
					element={
						userContext?.username != null &&
						userContext?.username !== "" ? (
							<PageNotFound />
						) : (
							<Login
								user={userContext}
								onUserChange={handleUserChange}
							/>
						)
					}
				/>
			</Routes>
		);
	} else {
		return <Login user={userContext} onUserChange={handleUserChange} />;
	}
}

export default App;
