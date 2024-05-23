import Container from "@/components/shared/Container";
import Nav from "@/components/shared/Nav";
import AuthChecker from "@/components/wrapper/AuthChecker";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FetchDeck from "@/functions/firestore/FetchDeck";
import { Button } from "@/components/ui/button";

const DeckPage:React.FC = () => {

    /** STATES **/

    /** HOOKS **/
    const { id } = useParams();
    const { data, refetch } = useQuery({
        queryKey: ["focused_deck"],
        queryFn: () => FetchDeck(id || "")
    });

    return (
        <AuthChecker>

            <div>

                <Nav />

                <Container>
                    
                    <div>

                        {data?.id}

                    </div>

                    <Button onClick={() => refetch()}>
                        REFRECHT
                    </Button>

                </Container>

            </div>

        </AuthChecker>
    )
}

export default DeckPage;