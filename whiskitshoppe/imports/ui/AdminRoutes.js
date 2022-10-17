import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthManagement";
import { Session } from "meteor/session";

const AdminRoute = ({component: RouteComponent, ...rest }) => {
    const {currentUser} = useContext(AuthContext);
    let admin = Session.get("Admin");
    return (
        <Route 
        {...rest}
        render={routeProps =>
        admin == "true" ? (
            <RouteComponent {...routeProps} />
        ) : (
            <Redirect to={"/login"} />
        )} />
    );
};

export default AdminRoute;