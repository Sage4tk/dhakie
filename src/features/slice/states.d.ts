import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export interface IUserSlice {
    user: User | null,
    loading: boolean
}

export interface IDeck {
    id: string,
    title: string,
    description: string,
    createdAt: Timestamp,
    userId: string
}