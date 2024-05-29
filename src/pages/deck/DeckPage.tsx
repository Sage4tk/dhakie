import Container from "@/components/shared/Container";
import Nav from "@/components/shared/Nav";
import AuthChecker from "@/components/wrapper/AuthChecker";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FetchDeck from "@/functions/firestore/FetchDeck";
import DeckInfo from "@/components/focused_deck/DeckInfo";

const DeckPage:React.FC = () => {

    /** STATES **/

    /** HOOKS **/
    const { id } = useParams();
    const { data } = useQuery({
        queryKey: ["focused_deck"],
        queryFn: () => FetchDeck(id || "")
    });


    return (
        <AuthChecker>

            <div>

                <Nav />

                <Container>

                    <div className="py-8">
                    
                    {
                        data && (
                            <>

                                <DeckInfo {...data} />

                            </>
                        )
                    }


                    </div>

                </Container>

            </div>

        </AuthChecker>
    )
}

export default DeckPage;