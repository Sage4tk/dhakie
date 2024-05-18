import { useSelector } from "react-redux";
import { IComponentBase } from "../components";
import { RootState } from "@/features/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// this component is present in all authenticated pages, this component will automatically redirect the user to the login page if no session is seen
const AuthChecker:React.FC<IComponentBase> = ({
    children
}) => {

    /** HOOKS **/
    const navigate = useNavigate();

    /** STATES **/
    const user = useSelector((state:RootState) => state.user);

    // use effect to check the user session and logout the user if nothing was seen!
    useEffect(() => {
        if (!user.user) {
            navigate("/")            
        }
    }, [user.user]);
    
    return (
        <>
        {children}
        </>
    )
}

export default AuthChecker;