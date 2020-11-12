import React from 'react'
import Card from "./Card"
import { Link } from 'react-router-dom'
import { axiosWithAuth } from './axiosWithAuth'


// This Component is where we'll render all of the friends we are getting back. It's helpful and organized to create another component to render each friend from.
const List = (props) => {

    const handleDelete = (id) => {

        // Passing in the ID of friend to delete
        axiosWithAuth().delete(`http://localhost:5000/api/friends/${id}`)
            .then(res => {
                console.log(res.data)

                // This will force reload the browser so that the rendered data will refresh
                window.location.reload()
            }).catch(err => console.dir(err))
    }

    return (
        <div>
            {props.data.map(d => {
                return (
                    <>
                        <Link to={`/editFriend/${d.id}`}>
                            <Card data={d} />
                        </Link>

                        {/* We're passing in the ID of the friend to delete to the handleDelete function */}
                        <button onClick={() => handleDelete(d.id)}>Delete</button>
                    </>
                )
            })}
        </div>
    )
}

export default List
