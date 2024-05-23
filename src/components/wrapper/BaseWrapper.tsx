import { onAuthStateChanged } from "firebase/auth";
import { IComponentBase } from "../components";
import { auth } from "@/lib/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/features/store";
import { SetUserReducer } from "@/features/slice/UserSlice";
import { Toaster } from "../ui/toaster";

const BaseWrapper:React.FC<IComponentBase> = ({
    children
}) => {

    const dispatch = useDispatch<AppDispatch>();

    onAuthStateChanged(auth, (user) => {
        dispatch(SetUserReducer(user));

        // set uid to localstorage
        if (user) localStorage.setItem("uid", user.uid);

        // remove uid if logged out
        if (!user) localStorage.removeItem("uid");
    })

    return (
        <div>
            {children}
            <Toaster />
        </div>
    )
}

export default BaseWrapper;