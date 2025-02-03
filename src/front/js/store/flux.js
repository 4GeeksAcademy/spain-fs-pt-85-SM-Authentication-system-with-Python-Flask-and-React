const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			auth: false,
			loggedUser: "",
		},
		actions: {
			// Use getActions to call a function within a fuction
			signup : async function signup(email, password) {
				try {
					let response = await fetch('https://glowing-halibut-x59j6jvg4q663pv56-3001.app.github.dev/api/signup',{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					})
					let data = await response.json();
					return data

				} catch (error) {
					return
				}
			},
			login: async (email, password) => {
				try {
					let response = await fetch('https://glowing-halibut-x59j6jvg4q663pv56-3001.app.github.dev/api/login', {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					})
					let data = await response.json();
					if (response.status === 200) {
						let token = data.access_token;
						localStorage.setItem("token", token);
						let actions = getActions();
						actions.getProfile();
						return response;
					}
					return data;
				} catch (error) {
					return;
				}
			},
			getProfile: async () => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch("https://glowing-halibut-x59j6jvg4q663pv56-3001.app.github.dev/api/profile", {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						},
					});
					const data = await response.json();
					const store = getStore();
					setStore({...store, loggedUser: data.logged_in_as, auth: true})
					return;
				} catch (error) {
					console.error(error);
				};
			},
			tokenVerify: async () => {
				//crear un nuevo endpoint que se llame verificacion de token
				//la peticion en la funcion tokenVerify del front deberia actualizar un estado auth:
				let token = localStorage.getItem("token");
				const store = getStore();
				const actions = getActions();
				try {
					let response = await fetch('https://glowing-halibut-x59j6jvg4q663pv56-3001.app.github.dev/api/token-verify', {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						},
					})
					if (response.status === 200) {
						setStore({...store, auth: true})
						actions.getProfile()
						return true;
					}				
					setStore({...store, auth: false});
					return false;
				} catch (error) {
					return
				}
			},
			logout:()=>{
				//borrar el token del localStorage
				const store = getStore();
				setStore({...store, loggedUser: "", auth: false})			
				localStorage.removeItem("token");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
