

const AddButton:React.FC<{
    onClick: () => void
}> = ({
    onClick
}) => {
    return (
        <button className="font-bold text-white text-4xl flex items-center justify-center bg-slate-400 rounded-lg" onClick={onClick}>
            +
        </button>
    )
}

export default AddButton