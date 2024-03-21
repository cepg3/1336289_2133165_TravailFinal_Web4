import React from "react";
import { UserContextType } from "../Login/UserContext";

export default function Game({
	gameCode,
	user,
	setKeepChecking,
}: {
	gameCode: string;
	user: UserContextType;
	setKeepChecking: (keepChecking: boolean) => void;
}) {
	return <div>Game</div>;
}
