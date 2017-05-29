import React from 'react'
import A from './models/Authentication'

const LoginStatus = () =>{

    if(A.isUserAuthenticated()){
        return(
            <div>
                <p style={{color:"yellow"}}>Your are logged in as: {A.getUserName()}</p>
            </div>
        )
    } else {
        return (
            <div>
            <p style={{color:"yellow"}}>Your are not logged in!</p>
            </div>
        )
    }
}

export default LoginStatus