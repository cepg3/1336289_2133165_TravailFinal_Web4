import AppHeader from "../AppHeader";
import LoginCard from "./LoginCard";
import React from "react";
import { UserContextType } from "./UserContext";

function Login({
	user,
	onUserChange,
}: {
	user: UserContextType | null;
	onUserChange: (user: UserContextType) => void;
}) {
	return (
		<>
			<AppHeader />
			<LoginCard user={user} onUserChange={onUserChange}/>
		</>
	);
}

export default Login;
