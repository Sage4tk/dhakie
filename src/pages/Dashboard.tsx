import AddButton from "@/components/shared/AddButton";
import Container from "@/components/shared/Container";
import Nav from "@/components/shared/Nav";
import AuthChecker from "@/components/wrapper/AuthChecker";

const Dashboard:React.FC = () => {

    return (
        <AuthChecker>
            <div>
                <Nav />
                

                <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-4 gap-4">

                    <AddButton onClick={() => {}} />
                    <AddButton onClick={() => {}} />
                    <div className="overflow-hiddens">
                        <p className="whitespace-normal">
                        GNAGMODE ASIDJASIDNASdaso djsaodnasodnasodasasiodnasi dnasidsanasdasudbsaudsabudasbudas asidasidbasidbasidbsai asdsadsadas  asdsadsadasdasd
                        </p>
                    </div>

                </div>
                </Container>
                
            </div>
        </AuthChecker>
    )
}

export default Dashboard;