import React, { useContext } from "react";
import logo from "./logo.svg";
import "../assets/css/App.css";
import { UserContextType } from "./Login/UserContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";

function App() {
	const [user, setUser] = React.useState<UserContextType | null>(null);
	const handleUserChange = (user: UserContextType) => {
		console.log("User name changed to: ", user);
		setUser(user);
	};

	return (
		<>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Login user={user} onUserChange={handleUserChange} />} />
					</Routes>
				</BrowserRouter>
		</>
	);
}

export default App;
