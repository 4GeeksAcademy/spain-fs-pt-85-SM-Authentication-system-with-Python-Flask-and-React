import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Go to landing page</span>
				</Link>
				<div>
					{!store.auth 
						?<div>
							<Link to="/signup">
								<button className="btn btn-warning mx-3">Signup</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-primary">Login</button>
							</Link>
						</div> 
						: <Link to="/">
							<button className="btn btn-danger" onClick={actions.logout}>Logout</button>
						</Link>
					}
					
					{/* {store.auth ? <Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>:null} */}
				</div>
			</div>
		</nav>
	);
};
