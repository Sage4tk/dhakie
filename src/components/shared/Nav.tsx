import { useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Container from "./Container";
import { RootState } from "@/features/store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

import { Avatar as AVATAR } from "@radix-ui/react-avatar";

const Nav:React.FC = () => {

    /** STATES **/
    const { user } = useSelector((state:RootState) => state.user);

    if (!user) return (null);

    return (
        <div className="py-4 border-b">

            <Container>

                <div className="flex justify-between items-center">

                    <h1 className="font-bold">DHAKIE</h1>

                    <DropdownMenu>

                        <DropdownMenuTrigger asChild>

                            <Avatar>
                                <AvatarFallback>{user.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
                            </Avatar>

                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="">

                            <DropdownMenuLabel>
                                {user.email}
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex justify-between items-center">
                                Profile
                                <User className="h-auto w-4" />
                            </DropdownMenuItem>

                            <DropdownMenuItem className="flex justify-between items-center">
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