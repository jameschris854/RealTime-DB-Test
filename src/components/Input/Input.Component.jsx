import React from 'react';
import './Input.styles.scss'

const Input = ({onChange,value},props) => {
    return (
        <div className='input-container'>
        <input className='Input' onChange={onChange} value={value} {...props} />
        </div>
    )
}

export default Input