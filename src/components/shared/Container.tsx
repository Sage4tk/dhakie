import { IComponentBase } from "../components";

const Container:React.FC<IComponentBase> = ({
    children
}) => {
    return (
        <div className="w-full flex flex-col items-center px-5">
            <div className="w-full md:w-[500px] lg:w-[1000px]">
                {children}
            </div>
        </div>
    )   
}

export default Container;