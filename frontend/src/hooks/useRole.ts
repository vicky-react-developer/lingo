// import { useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";


export default function useRole() {
    const { user } = useAuth();
    // const { pathname } = useLocation();

    const role = user ? user.role : null;

    return {
        role
    }
}