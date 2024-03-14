import React, { useEffect } from "react";
import { UserContextType } from "./Login/UserContext";
import { useNavigate } from "react-router-dom";
import ChooseJoinOrCreate from "./ChooseJoinOrCreate";

function Dashboard({ user }: { user: UserContextType | null }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (user?.username === "") {
			navigate("/");
		}
	}, [user, navigate]);

	return <ChooseJoinOrCreate />;
}

export default Dashboard;
