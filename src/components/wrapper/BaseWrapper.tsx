import { onAuthStateChanged } from "firebase/auth";
import { IComponentBase } from "../components";
import { auth } from "@/lib/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/features/store";
import { SetUserReducer } from "@/features/slice/UserSlice";

const BaseWrapper:React.FC<IComponentBase> = ({
    children
}) => {

    const dispatch = useDispatch<AppDispatch>();

    onAuthStateChanged(auth, (user) => {
        dispatch(SetUserReducer(user));
    })

    return (
        <div>
            {children}
        </div>
    )
}

export default BaseWrapper;