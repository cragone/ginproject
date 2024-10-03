import React from "react";



const MyComponent = ({props}) => {
    console.log(props)
    
    return (
        <>
        {props}
        </>
    )
}

export default MyComponent;