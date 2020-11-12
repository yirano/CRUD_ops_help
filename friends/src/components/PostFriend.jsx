import React from 'react'
import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { axiosWithAuth } from "./axiosWithAuth"


const initialForm = {
    name: '',
    age: '',
    email: ''
}

const PostFriend = () => {

    const [form, setForm] = useState(initialForm)
    const history = useHistory()

    // We are using the useParams hook to get the ID of the friend in the URL
    const params = useParams().id
    const [editing, setEditing] = useState(false)


    useEffect(() => {
        axiosWithAuth().get(`http://localhost:5000/api/friends/${params}`)
            .then(res => {
                console.log(res)
                setForm(res.data)
                setEditing(true)
            })
            .catch(err => {
                console.dir(err)
            })
        // We're going to watch for the changes in the "editing" state so that the form can populate whenever this gets triggered. It helps the browser to re-render also.
    }, [editing])

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        // We created a "editing" state to check whether the form is being used to edit a friend or to add a new friend.

        // If we are editing, we're going to make a PUT request to update that friend's data
        if (editing) {
            axiosWithAuth().put(`http://localhost:5000/api/friends/${params}`, form)
                .then(res => {
                    // After we send the PUT request we'll set the editing to False in case we want to add a new friend
                    setEditing(false)

                    setForm(initialForm)
                }).catch(err => console.dir(err))
        } else {
            axiosWithAuth().post('http://localhost:5000/api/friends', form).then(res => {
                history.push('/')
                console.log(res)
            }).catch(err => console.dir(err))
        }
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <input type="text" name="name" value={form.name} onChange={e => handleChange(e)} placeholder="Name" />
            <input type="text" name="age" value={form.age} onChange={e => handleChange(e)} placeholder="Age" />
            <input type="text" name="email" value={form.email} onChange={e => handleChange(e)} placeholder="Email" />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default PostFriend
