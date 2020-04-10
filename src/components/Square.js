import React from 'react'

const styles = {
    background: 'darkgrey',
    border: '2px solid black',
    fontSize: '5em',
    fontWeight: '900',
    cursor: 'pointer',
    outline: 'none'
}

export default function Square({onClick, value}) {
    return (
        <button onClick={onClick} style={styles}>
            {value}
        </button>
    )
}
