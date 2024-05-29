import { IDeck } from "@/features/slice/states";
import { db } from "@/lib/firebase";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";

const FetchDeck = async (id:string):Promise<IDeck | null> => {
    try {

        // const findDeck = await getDoc(doc(db, "decks", id));

        const findDeck = await getDocs(query(collection(db, "decks"), where("userId","==", localStorage.getItem("uid")), where(documentId() ,"==", id)));


        if (findDeck.empty) throw null;


        return {
            id: findDeck.docs[0].id,
            ...findDeck.docs[0].data()
        } as IDeck;

    } catch (err) {
        return null;
    }
    
}

export default FetchDeck;