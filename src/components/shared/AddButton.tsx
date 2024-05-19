

const AddButton:React.FC<{
    onClick: () => void
}> = ({
    onClick
}) => {
    return (
        <button className="font-bold border  text-3xl hover:shadow hover:scale-[1.01] active:scale-100 flex items-center justify-center rounded-lg" onClick={onClick}>
            +
        </button>
    )
}

export default AddButton