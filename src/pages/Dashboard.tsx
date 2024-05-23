import AddButton from "@/components/shared/AddButton";
import Container from "@/components/shared/Container";
import Nav from "@/components/shared/Nav";
import DeckCard from "@/components/shared/cards/DeckCard";
import AuthChecker from "@/components/wrapper/AuthChecker";
import { IDeck } from "@/features/slice/states";
import { RootState } from "@/features/store";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard:React.FC = () => {

    const { user } = useSelector((state:RootState) => state.user);
    const [decks, setDecks] = useState<Array<IDeck>>([]);
    
    useEffect(() => {

        getDocs(query(collection(db, "decks"), where("userId", "==", user?.uid || "")))
        .then((snapshot) => {
            if (!snapshot.empty) {
                let tester:any[] = [];
                snapshot.forEach((data) => {

                    tester = [
                        ...tester,
                        {
                            id:data.id,
                            ...data.data()
                        }
                    ];

                })

                setDecks(tester);
            }
        })
    }, [])


    return (
        <AuthChecker>
            <div>
                <Nav />
                

                <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-4 gap-4">

                    <AddButton onClick={() => {}} />

                    {decks.map((data) => (
                        <DeckCard key={data.id} {...data} />
                    ))}
                    

                </div>
                </Container>
                
            </div>
        </AuthChecker>
    )
}

export default Dashboard;