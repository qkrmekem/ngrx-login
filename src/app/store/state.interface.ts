import { User } from "../models/user.model";

export interface State {
    accessToken: string | null;
    user: User | null;
    error: any | null;
}