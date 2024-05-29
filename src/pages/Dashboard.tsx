import AddButton from "@/components/shared/AddButton";
import Container from "@/components/shared/Container";
import Nav from "@/components/shared/Nav";
import DeckCard from "@/components/shared/cards/DeckCard";
import AuthChecker from "@/components/wrapper/AuthChecker";
import { RootState } from "@/features/store";
import AllDecks from "@/functions/firestore/AllDecks";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const Dashboard:React.FC = () => {

    const { user } = useSelector((state:RootState) => state.user);
    
    const { data } = useQuery({
        queryKey: ["deck_list"],
        queryFn: () => AllDecks()
    });

    return (
        <AuthChecker>
            <div>
                <Nav />
                

                <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-4 gap-4">

                    <AddButton onClick={() => {}} />

                    {data?.map((data) => (
                        <DeckCard key={data.id} {...data} />
                    ))}
                    

                </div>
                </Container>
                
            </div>
        </AuthChecker>
    )
}

export default Dashboard;