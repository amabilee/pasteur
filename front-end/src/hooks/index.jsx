import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

export function UseAuth() {
    const context = useContext(AuthContext)

    return context
}