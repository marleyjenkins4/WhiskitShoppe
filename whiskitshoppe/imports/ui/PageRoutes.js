import React from "react";
import {
    Login,
    Register,
    ResetPassword,
    Home,
    About,
    Order,
    AdminGallery,
    Gallery,
    Cart,
    AdminOrders,
    Category,
    CategoryList,
    ItemDetail,
    Success
} from './pages';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import AdminRoute from "./AdminRoutes";
import AdminHome from "./pages/AdminHome";


/*
This is where the functionality of what link goes to where is set up. To add another link:
    <Route path="/route" component={Render} />
after the '/' put the url you want to use to direct to the page. The component that holds the page you want to render will be in
between '{}'. add that component name to the list of imports. Make sure the component file is in the pages folder.
Then add the page as an export in index.js. Follow the pattern that has been used there.
Finally add the link to NavBar.js in order to have access to the link.
*/

const PageRoutes = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/about" component={About} />
                    <Route path="/register" component={Register} />
                    <Route path="/reset-password" component={ResetPassword} />
                    <PrivateRoute path='/order' component={Order} />
                    <AdminRoute path="/adminGallery" component={AdminGallery} />
                    <Route path="/gallery" component={Gallery} />
                    <Route path="/cart" component={Cart} />
                    <AdminRoute path="/adminOrders" component={AdminOrders} />
                    <AdminRoute path="/admin" component={AdminHome} />
                    <Route path="/menu" exact component={CategoryList} />
                    <Route path="/menu/:category" exact component={Category} />
                    <Route path="/menu/:category/:itemID" exact component={ItemDetail} />
                    <Route path="/success" component={Success} />
                </Switch>
            </div>
        </Router>
    )
}

export default PageRoutes