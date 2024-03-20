import React from "react";
import { UserContextType } from "../Login/UserContext";

export default function Game({
	gameCode,
	user,
}: {
	gameCode: string;
	user: UserContextType;
}) {
	return <div>Game</div>;
}
