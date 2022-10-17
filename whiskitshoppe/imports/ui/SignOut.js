import React from "react";
import auth from "../api/Auth";
import { Session } from "meteor/session";
import { signOut } from "firebase/auth";

const handleSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        Session.clearPersistent();
        console.log("Signed out");
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}


const SignOut = () => {
    return (
        <button  className="buttonAsLink" onClick={handleSignOut}>Sign out</button>
    )
}

export default SignOut;