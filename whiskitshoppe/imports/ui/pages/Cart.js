import React from "react";
import { Session } from "meteor/session";
import CartItem from "../CartItem";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";


/* Will get the cart array from the Cart key in the session and then will iterate over it to form a list */
const Cart = () => {
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
        <h1>Shopping Cart</h1>

        {Session.get("Cart").length > 0 ? (
        <div className="shopping-cart">
          <div className="column-labels">
            <label className="product-image">Image</label>
            <label className="product-details">Product</label>
            <label className="product-price">Size/Price</label>
            <label className="product-quantity">Quantity</label>
            <label className="product-removal">Remove</label>
          </div>

          {CartList()}
          <div className="finBtn">
            <button
              onClick={() => Session.clearPersistent()}
              className="feature__btn"
              id="empty"
            >
              Empty Cart
            </button>
            <Link to="/order" className="feature__btn">
              Place Order
            </Link>
          </div>
          <div className = "policy">
          <div className = "disc"> <div className = "DiscTitle">Refund Policy</div> Once a cake has been picked up, it is considered "Accepted." All products are
                the responsibility of the customer once it leaves our shop. Refunds requested
                due to decorating style, color shade or general decoration design will not be
                honored. We bake one day and decorate the next. Refunds requested due to
                flavor or texture after the cake has been accepted and picked up will not be
                honored. Keep in mind variety in temperature and humidity may impact the flavor,
                overall design, or texture of the cake to some degree. If you cancel a cake order
                before it is picked up, there is NO refund. If you come to our store for “pick up”
                and the cake does not meet your expectations, we will work with you to find a
                solution. The following scenario is the only instance when we will provide a full
                refund: If we fail to deliver your cake on the date and time agreed upon. We do
                not give refunds under any other circumstances. </div>
        </div>
      </div>
        ): (
          <div className="emptyCart">
          <h1 className="cart">Your cart is empty! Add some goodies from the menu</h1>
           <Link to="/menu" className="feature__btn">
              Go To Menu
            </Link>
            </div>
        )}
                <Footer />

      </div>
    </div>
  );
};

export default Cart;
