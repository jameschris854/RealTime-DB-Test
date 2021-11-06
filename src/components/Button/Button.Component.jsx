import React from 'react';
import './Button.styles.scss'

const Button = ({handleClick,children,style}) => {
    return (
        <div className='button-container' style={{...style}} onClick={handleClick}>
            {children}
        </div>
    )
}

export default Button