import React from "react";
import "../assets/css/App.css";
import { UserContextType } from "./Login/UserContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import PageNotFound from "./PageNotFound";
import Dashboard from "./Dashboard";
import Join from "./Join";
import Create from "./Create";
import Game from "./Game/Game";

function App() {
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

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			{user?.username != null && user?.username !== "" ? (
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<Login
									user={user}
									onUserChange={handleUserChange}
								/>
							}
						/>
						<Route
							path="/dashboard"
							element={<Dashboard user={user} />}
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
									user={user}
								/>
							}
						/>

						<Route
							path="*"
							element={
								user?.username != null &&
								user?.username !== "" ? (
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
				</BrowserRouter>
			) : (
				<BrowserRouter>
					<Login user={user} onUserChange={handleUserChange} />
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
