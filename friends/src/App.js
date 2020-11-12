import React, { useEffect } from "react"
import { Route, Link } from "react-router-dom"
import Axios from "axios"
import { axiosWithAuth } from "./components/axiosWithAuth"
import Login from "./components/Login"
import PostFriend from "./components/PostFriend"
import "./App.css"
import List from "./components/List"
import { useState } from "react"

function App() {
	const [ friends, setFriends ] = useState([])
	useEffect(() => {
		axiosWithAuth()
			.get("http://localhost:5000/api/friends")
			.then((res) => {
				setFriends(res.data)
			})
			.catch((err) => console.dir(err))
	}, [])
	return (
		<div className="App">
			<Link to="/login">Log In</Link>
			<Link to="/post">Post Friend</Link>

			<Route path="/post" component={PostFriend} />
			<Route path="/login" component={Login} />
			<Route path="/editFriend/:id" component={PostFriend} />
			<List data={friends} />
		</div>
	)
}

export default App
