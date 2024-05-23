import { IDeck } from "@/features/slice/states";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const AllDecks = async (id:string):Promise<IDeck[]> => {
    try {

        if (!id) throw null;

        const findDeck = await getDocs(query(collection(db, "decks"), where("userId", "==", id)))

        if (findDeck.empty) throw null;

        let deck_list:IDeck[] = [];

        findDeck.forEach(data => {
            deck_list = [
                ...deck_list,
                {
                    id: data.id,
                    ...data.data() as any
                }
            ]
        })

        return deck_list;

    } catch (err) {
        return [];
    }
    
}

export default AllDecks;