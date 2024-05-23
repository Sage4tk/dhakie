import Container from "@/components/shared/Container";
import Nav from "@/components/shared/Nav";
import AuthChecker from "@/components/wrapper/AuthChecker";
import { useParams } from "react-router-dom";

const DeckPage:React.FC = () => {

    const { id } = useParams();

    return (
        <AuthChecker>

            <div>

                <Nav />

                <Container>
                    
                    <div>

                        {id}

                    </div>

                </Container>

            </div>

        </AuthChecker>
    )
}

export default DeckPage;