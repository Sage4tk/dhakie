import { IDeck } from "@/features/slice/states";
import { Link } from "react-router-dom";


const DeckCard:React.FC<IDeck> = (props) => {
    return (
        <Link to={`/deck/${props.id}`} className="border rounded-md p-4 select-none hover:shadow-sm hover:scale-105 transition-all cursor-pointer">
            <h2 className="font-semibold">{props.title}</h2>
            <p className="text-sm">{props.description}</p>
        </Link>
    )
}

export default DeckCard;