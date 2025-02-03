import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store } = useContext(Context);


    return (
        <div className="text-center mt-5">
            <h1>Profile section</h1>
            <h2>Welcome {store.loggedUser}</h2>
        </div>
    );
};
