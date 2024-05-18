import { Button } from "@/components/ui/button";
import AuthChecker from "@/components/wrapper/AuthChecker";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const Dashboard:React.FC = () => {

    const logout = async ():Promise<void> => {
        await signOut(auth);
    }

    return (
        <AuthChecker>
        <div className="h-screen w-screen flex items-center justify-center flex-col space-y-6">
            <h1 className="text-xl font-bold">DASHBOARD SCREEN</h1>
            <Button onClick={logout}>LOGOUT</Button>
        </div>
        </AuthChecker>
    )
}

export default Dashboard;