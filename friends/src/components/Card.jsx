import React from 'react'

const quickStyle = {
    border: '1px solid black',
    padding: '20px',
    width: '300px',
    margin: 'auto'
}

const Card = (props) => {

    return (
        <div style={quickStyle}>
            <h4>Name: {props.data.name}</h4>
            <h4>Age: {props.data.age}</h4>
            <h4>Email: {props.data.email}</h4>
        </div>
    )
}

export default Card
