import { Session } from "next-auth";

export type SessionContextValue = {
    session: Session | null;
    sessionLoading: boolean;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
}