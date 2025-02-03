
import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";





function SignupForm() {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const {store, actions} = useContext(Context);
    let navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault()
        const signup = await actions.signup(emailValue, passwordValue)
        if (signup.msg) navigate("/");
    }


    return (
        <div className="text-center">
            <h1 className="mt-5">Please fill the form with your data to create a new user</h1>
            <form className="mx-auto mt-5 w-50" onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)
                    } placeholder="example@example.example"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignupForm;