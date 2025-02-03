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
					console.log(response);
					let data = await response.json();
					return data

				} catch (error) {
					console.log(error);
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
					console.log(response);
					let data = await response.json();
					console.log("data:",data);
					if (response.status === 200) {
						let token = data.access_token;
						localStorage.setItem("token", token);
						let actions = getActions();
						actions.getProfile();
						return response;
					}
					return data;
				} catch (error) {
					console.log(error);
					return;
				}
			},
			// 	const myHeaders = new Headers();
			// 	myHeaders.append("Content-Type", "application/json");

			// 	const raw = JSON.stringify({
			// 		"email": email,
			// 		"password": password
			// 	});

			// 	const requestOptions = {
			// 		method: "POST",
			// 		headers: myHeaders,
			// 		body: raw,
			// 		redirect: "follow"
			// 	};

			// 	try {
			// 		const response = await fetch("https://potential-spork-7pvx7qxxxj9c64x-3001.app.github.dev/api/login", requestOptions);
			// 		const result = await response.json();

			// 		if (response.status === 200) {
			// 			localStorage.setItem("token", result.access_token)
			// 			return true
			// 		}
			// 	} catch (error) {
			// 		console.error(error);
			// 		return false;
			// 	};
			// },
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
					console.log(data)
					const store = getStore();
					setStore({...store, loggedUser: data.logged_in_as, auth: true})
					return;
				} catch (error) {
					console.error(error);
				};
			},
			tokenVerify:()=>{
				//crear un nuevo endpoint que se llame verificacion de token
				//la peticion en la funcion tokenVerify del front deberia actualizar un estado auth:
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
					console.log("Error loading message from backend", error)
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
