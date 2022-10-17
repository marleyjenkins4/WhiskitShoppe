import React from "react"
import PlaceOrder from "../PlaceOrder"
import { Session } from "meteor/session"
import CartItem from "../CartItem"
import Nav from "../Nav";
import Footer from "../Footer";



const Order = () => {
    const CartList = () => {
        // gets the value of the last key used which will also indicate how many items are in the cart
        let cartItems = Session.get("Cart");

        return cartItems.map((item, index) => {
            return <CartItem key={index} Item={item} index={index} />;
        });
    };

    return (
        
        
     <div className="page-container">
    <div className="content-wrap">
      <Nav />


            <div className="order">
            <h1 className="orderTitle">Confirm Your Order</h1>
            <div className="column-labels">
                <label className="product-image">Image</label>
                <label className="product-details">Product</label>
                <label className="product-price">Size/Price</label>
                <label className="product-quantity">Quantity</label>
                <label className="product-removal">Remove</label>
            </div>
            {CartList()}
            <PlaceOrder />
            </div>
            <Footer />

        </div>
        </div>

    )
}

export default Order;