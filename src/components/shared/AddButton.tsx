import { useState } from "react"
import CreateDeck from "./CreateDeck"


const AddButton:React.FC<{
    onClick: () => void
}> = ({
    onClick
}) => {

    /** STATES **/
    const [open, setOpen] = useState<boolean>(false);

    return (
        <CreateDeck open={open} setOpen={setOpen}>
            <button className="font-bold border  text-3xl hover:shadow hover:scale-[1.01] active:scale-100 flex items-center justify-center rounded-lg" onClick={onClick}>
                +
            </button>
        </CreateDeck>
    )
}

export default AddButton