import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertCredentials, setAlertCredentials] = useState("d-none");
    const { store, actions } = useContext(Context);
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        let login = await actions.login(email, password)
        if (login.status === 200) {
            navigate("/profile");
            setAlertCredentials("d-none")
            return
        }
        setAlertCredentials("alert alert-danger")
    }

    return (
        <div className="text-center">
            <div className={alertCredentials} role="alert">
                Incorrect user or password
            </div>
            <h1 className="mt-5">Please fill the form with your data to login</h1>
            <form onSubmit={handleSubmit} className="mt-5 mx-auto w-50">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)} value={email} placeholder="example@example.example" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                        onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};