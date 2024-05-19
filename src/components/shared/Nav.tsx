import { useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Container from "./Container";
import { RootState } from "@/features/store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

import { Avatar as AVATAR } from "@radix-ui/react-avatar";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Nav:React.FC = () => {

    /** STATES **/
    const { user } = useSelector((state:RootState) => state.user);

    // logout user out function
    const logout = async ():Promise<void> => {
        await signOut(auth);
    }

    if (!user) return (null);

    return (
        <div className="py-4 border-b">

            <Container>

                <div className="flex justify-between items-center">

                    <h1 className="font-bold">DHAKIE</h1>

                    <DropdownMenu>

                        <DropdownMenuTrigger asChild>

                            <Avatar className="cursor-pointer">
                                <AvatarFallback>{user.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
                            </Avatar>

                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="">

                            <DropdownMenuLabel className="cursor-default">
                                {user.email}
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex justify-between items-center cursor-pointer">
                                Profile
                                <User className="h-auto w-4" />
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={logout} className="flex justify-between items-center cursor-pointer">
                                Logout
                                <LogOut className="h-auto w-4" />
                            </DropdownMenuItem>

                        </DropdownMenuContent>

                    </DropdownMenu>
                    
                </div>

            </Container>

        </div>
    )
}

export default Nav;