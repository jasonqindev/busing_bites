import { useContext, useEffect } from "react";

import { AuthContext } from "context/auth-context";
import { useNavigate } from "react-router-dom";
import { userStateListener } from "../../../firebase/firebase";

const Logout = () => {
    const { signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        signOut();
    }, []);

    userStateListener((user) => {
        if (!user) {
            navigate("/");
        }
    });

    return <div>Logging out...</div>;
};

export default Logout;