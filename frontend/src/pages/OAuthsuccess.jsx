import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function OAuthSuccess() {
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");
        const name = params.get("name");
        const avatar = params.get("avatar");

        if (token) {
            const user = { token, name, avatar };
            localStorage.setItem("user", JSON.stringify(user));
            setCurrentUser(user);
            navigate("/forum");
        }
    }, []);

    return null;
}

export default OAuthSuccess;
