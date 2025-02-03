import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useLocation } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            if (location.pathname) {
                let tokenVerification = await actions.tokenVerify();
                if (!tokenVerification) {
                    navigate("/login");
                    alert("Session expired, you need to login again.")
                }
            }
        };
        verifyToken();
    }, [location.pathname]);

    return (
        <div className="text-center mt-5">
            <h1>Profile section</h1>
            <h2>Welcome {store.loggedUser}</h2>
        </div>
    );
};
