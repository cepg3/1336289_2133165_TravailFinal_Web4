import React from "react";
import "../assets/css/App.css";
import { UserContextType } from "./Login/UserContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import PageNotFound from "./PageNotFound";
import Dashboard from "./Dashboard";

function App() {
	const [user, setUser] = React.useState<UserContextType>({ username: "" });
	const handleUserChange = (user: UserContextType) => {
		console.log("User name changed to: ", user);
		setUser(user);
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
			</BrowserRouter>
		</div>
	);
}

export default App;
