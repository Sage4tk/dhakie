const DisplayInitial = (name:string):string => {
    return name.split(" ").map((string) => string[0].toUpperCase()).join();
}

export default DisplayInitial;