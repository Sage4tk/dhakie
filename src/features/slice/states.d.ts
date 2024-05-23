import { User } from "firebase/auth";

export interface IUserSlice {
    user: User | null
}

export interface IDeck {
    id: string,
    title: string,
    description: string,
    createAt: string,
    userId: string
}