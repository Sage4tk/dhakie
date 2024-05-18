import LoginForm from "@/components/login/LoginForm";
import { RootState } from "@/features/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Login:React.FC = () => {

    /** HOOKS **/
    const navigate = useNavigate();

    /** STATES **/
    const user = useSelector((state:RootState) => state.user);

    // use effect to check if there is a user, if there is a user then redirect to dashboard page if user tries to directly go to home page
    useEffect(() => {
        if (user.user) {
            navigate("/dashboard");
        }        
    }, [user.user]);

    return (
        <div className="w-screen h-screen flex items-center justify-center px-5">
            <LoginForm />
        </div>
    )
}

export default Login;