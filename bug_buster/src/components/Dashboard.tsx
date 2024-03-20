import { UserContextType } from "./Login/UserContext";
import ChooseJoinOrCreate from "./ChooseJoinOrCreate";

function Dashboard({ user }: { user: UserContextType | null }) {
	return <ChooseJoinOrCreate />;
}

export default Dashboard;
