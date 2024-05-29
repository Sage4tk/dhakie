import { IDeck } from "@/features/slice/states";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";


const DeckInfo:React.FC<IDeck> = (props) => {

    const [cards, setCards] = useState<IDeck[]>([]);




    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
                <CardDescription>{new Date(props.createdAt.seconds * 1000).toLocaleDateString()}</CardDescription>
            </CardHeader>

            <CardContent>
                
                <div className="p-4 py-10 border rounded border-dashed flex items-center justify-center">

                    <div className="flex flex-col items-center space-y-4">

                        <p>No cards in this decks.</p>
                        
                        <Button>ADD CARD</Button>

                    </div>
                    
                </div>

            </CardContent>
        </Card>
    )
}

export default DeckInfo;