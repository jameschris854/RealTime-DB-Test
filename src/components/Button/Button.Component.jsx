import React from 'react';
import './Button.styles.scss'

const Button = ({handleClick,children}) => {
    return (
        <div className='button-container' onClick={handleClick}>
            {children}
        </div>
    )
}

export default Button