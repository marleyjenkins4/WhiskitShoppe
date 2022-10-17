import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import auth from "../../api/Auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { AuthContext } from "../AuthManagement";
import Nav from "../Nav"


const ResetPassword = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email } = event.target.elements;
            try {
                await sendPasswordResetEmail(auth, email.value)
                    .then(() => {
                        // Password reset email sent!
                        // ..
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log("error: ", errorCode, errorMessage);
                        // ..
                    });
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to='/' />;
    }

    return (
        <div className="page-container">
        <div className="content-wrap">
        <Nav />
        <div className="login">
            <h1 className="logTitle">Reset Password</h1>
            <form onSubmit={handleLogin}>
                <label className="email2">
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <button type="submit" className="feature__btn2">Submit</button>

            </form>
            </div>

        </div>
        </div>
    );
};

export default withRouter(ResetPassword);