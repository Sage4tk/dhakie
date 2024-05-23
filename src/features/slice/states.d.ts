import { User } from "firebase/auth";

export interface IUserSlice {
    user: User | null,
    loading: boolean
}

export interface IDeck {
    id: string,
    title: string,
    description: string,
    createAt: string,
    userId: string
}