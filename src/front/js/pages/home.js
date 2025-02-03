import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { LoginForm } from "../component/loginForm";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="position-absolute top-50 start-50 translate-middle text-center">
			<h1>Welcome!</h1>
			<h2 className="alert alert-success">Please, login to access your private area</h2>
			{/* <LoginForm/> */}
		</div>
	);
};
