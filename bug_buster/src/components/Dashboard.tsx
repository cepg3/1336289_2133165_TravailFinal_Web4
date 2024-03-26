import { UserContextType } from "./Login/UserContext";
import ChooseJoinOrCreate from "./ChooseJoinOrCreate";

function Dashboard({ user }: { user: UserContextType | null }) {

	// log the user
	console.log("User logged in: ", user);

	return <ChooseJoinOrCreate user={user} />;
}


export default Dashboard;
