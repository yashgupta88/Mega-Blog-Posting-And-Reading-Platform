import React from "react";

function Button({children ,
    type='button',
    bgColor = 'bg-blue-600',
    textColor='text-white',
    className='',
    ...props

}){

    // childeren is just button text 
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} dueation-300 hover:scale-110`} {...props}>
            {children}
        </button>
    )
}

export default Button