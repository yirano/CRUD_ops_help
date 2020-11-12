import React, { useState } from "react"
import Axios from "axios"
import { useHistory } from "react-router-dom"
const initialState = {
	username: "",
	password: ""
}
const Login = (props) => {
	const [ userData, setUserData ] = useState(initialState)
	const [ form, setForm ] = useState(initialState)
	const history = useHistory()

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(form)
		Axios.post("http://localhost:5000/api/login", form)
			.then((res) => {
				console.log(res.data)
				localStorage.setItem("token", res.data.payload)
				history.push("/")
			})
			.catch((err) => console.dir(err))
	}

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}
	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input type="text" name="username" value={form.username} onChange={(e) => handleChange(e)} />
				<input type="text" name="password" value={form.password} onChange={(e) => handleChange(e)} />
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}

export default Login
