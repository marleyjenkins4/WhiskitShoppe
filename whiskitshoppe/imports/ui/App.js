import React from "react"
import PageRoutes from "./PageRoutes.js"
import '../api/Firebase'
import { AuthContext, AuthProvider } from "./AuthManagement.js"
import { Session } from 'meteor/session';



const App = () => {

    // set the default if there is no session
    Session.setDefaultPersistent("Cart", []);
   
    return (
        <>
        <AuthProvider>
            <PageRoutes />
        </AuthProvider>

        </>
    )
}

export default App