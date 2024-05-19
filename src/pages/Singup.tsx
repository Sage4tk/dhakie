import SignupForm from "@/components/signup/SignupForm";
import { RootState } from "@/features/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup:React.FC = () => {

    /** STATES **/
    const { user } = useSelector((state:RootState) => state.user);

    /** HOOKS **/
    const navigate = useNavigate();

    // redirect the user to dashboard if a auth session is pressent
    useEffect(() => {
        if (user) navigate("/dashboard")
    }, [user])

    return (
        <div className="w-screen h-screen flex items-center justify-center p-5 py-10">
            
            <SignupForm />

        </div>       
    )
}

export default Signup;