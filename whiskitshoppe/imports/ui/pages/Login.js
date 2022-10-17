import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import auth from "../../api/Auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../AuthManagement";
import { Link } from "react-router-dom";
import Nav from "../Nav"


const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await signInWithEmailAndPassword(auth, email.value, password.value);
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
            <h1 className="logTitle">Login</h1>
            <form onSubmit={handleLogin} className="logForm">
                <label className="email">
                
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label className="email">
                    
                    <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit" className="feature__btn">Submit</button>
            </form>
           <div className="link"> <Link to='/reset-password'>Reset Password</Link></div>
           <div className="link"><Link to='/register'>Create Account</Link></div>
            </div>

        </div>
        </div>
    );
};

export default withRouter(Login);