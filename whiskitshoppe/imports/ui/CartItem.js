import React from "react";
import { EditItemInCart, RemoveItemFromCart } from "../api/AddToCart";

// will display the item in the cart after it is passed in
const CartItem = (item) => {
  const AddItem = () => {
    let quantity = parseInt(item.Item.quantity);
    item.Item.quantity = quantity + 1;
    EditItemInCart(item.index, item.Item);
  };

  const RemoveItem = () => {
    let quantity = parseInt(item.Item.quantity);
    if (quantity == 1) {
      RemoveItemFromCart(item.index);
    } else {
      item.Item.quantity = quantity - 1;
      EditItemInCart(item.index, item.Item);
    }
  };

  // have different jsx element based off of the  of type so that car item can be used for all three menuTypes
  let type = item.Item.typeName();
  let finalElement = <p>Add something to your cart</p>;

  if (type == "CookieBarSpecialty") {
    finalElement = (
      <div className="product">
        <div className="product-image">
          <img src="../img/cookie.png" /> {/* Cart Image here */}
        </div>
        <div className="product-details">
          <div className="product-title">{item.Item.name}</div>
          {item.Item.special != "" ? (
            <p className="itemDetail">Special Requests: {item.Item.special}</p>
          ) : (
            <p className="itemDetail">No special Requests</p>
          )}
        </div>
        <div className="product-price" id="cupcakePrice">
          {item.Item.sizePrice}
        </div>
        <div className="product-quantity">
          <div className="product-price">{item.Item.quantity}</div>
          <div className="quantityEdit">
            <button onClick={() => AddItem()} className="feature__btnPlus">
              +
            </button>{" "}
            <button onClick={() => RemoveItem()} className="feature__btnMin">
              -
            </button>
          </div>
        </div>
        <button
          id="removeItem"
          className="feature__btn3"
          onClick={() => RemoveItemFromCart(item.index)}
        >
          Remove Item From Cart
        </button>
      </div>
    );
  } else if (type == "Cake") {
    finalElement = (
      <div className="product">
        <div className="product-image">
          <img src="../img/cake.png" /> {/* Cart Image here */}
        </div>
        <div className="product-details">
          <div className="product-title">{item.Item.name}</div>
          <p id="item">Number of Tiers: </p>
          <p className="itemDetail">{item.Item.tiers}</p>
          <p id="item">Cake Flavors:</p>
          {item.Item.cakeFlavors.map((flavor) => {
            return <p className="itemDetail">{flavor}</p>;
          })}
          {item.Item.covering != "" ? (
            <>
              <p id="item">Covering: </p>
              <p className="itemDetail">{item.Item.covering}</p>
            </>
          ) : (
            <span className="invisible"></span>
          )}
          {item.Item.icingFlavors != "" ? (
            <div>
              <p id="item">Icing Flavors:</p>
              {item.Item.icingFlavors.map((flavor) => {
                return <p className="itemDetail">{flavor}</p>;
              })}
            </div>
          ) : (
            <span className="invisible"></span>
          )}
          {item.Item.fondantType != "" ? (
            <>
              <p id="item">Fondant Type: </p>
              <p className="itemDetail">{item.Item.fondantType}</p>
            </>
          ) : (
            <span className="invisible"></span>
          )}
          {item.Item.fillingFlavors != "" ? (
            <div>
              <p id="item">Filling Flavors:</p>
              {item.Item.fillingFlavors.map((flavor) => {
                return <p className="itemDetail">{flavor}</p>;
              })}
            </div>
          ) : (
            <span className="invisible"></span>
          )}
          {item.Item.topping != "" ? (
            <>
              <p id="item">Topping: </p>
              <p className="itemDetail">{item.Item.topping}</p>
            </>
          ) : (
            <span className="invisible"></span>
          )}
          {item.Item.message != "" ? (
            <>
              <p id="item">Message: </p>
              <p className="itemDetail">{item.Item.message}</p>
              <p id="item">Message Location: </p>
              <p className="itemDetail">{item.Item.messageLocation}</p>
            </>
          ) : (
            <span className="invisible"></span>
          )}

          {item.Item.special != "" ? (
            <p className="itemDetail">Special Requests: {item.Item.special}</p>
          ) : (
            <p className="itemDetail">No special Requests</p>
          )}
        </div>
        <div className="product-price">
          {item.Item.sizePrice.map((size, index) => {
            return <p className="item">{item.Item.tiers > 1 ? "Tier "+ (index+1)+":" : ""} {size}</p>;
          })}
        </div>
        <div className="product-quantity">
          <div className="product-price">{item.Item.quantity}</div>
          <div className="quantityEdit">
            <button onClick={() => AddItem()} className="feature__btnPlus">
              +
            </button>{" "}
            <button onClick={() => RemoveItem()} className="feature__btnMin">
              -
            </button>
          </div>
        </div>
        <button
          id="removeItem"
          className="feature__btn3"
          onClick={() => RemoveItemFromCart(item.index)}
        >
          Remove Item From Cart
        </button>
      </div>
    );
  } else if (type == "CupcakePie") {
    finalElement = (
      <div className="product">
        <div className="product-image">
          <img src="../img/cupcake.png" /> {/* Cart Image here */}
        </div>
        <div className="product-details">
          <div className="product-title">{item.Item.name}</div>
          <p className="itemDetail">Flavor: {item.Item.flavor}</p>
          {item.Item.special != "" ? (
            <p className="itemDetail">Special Requests: {item.Item.special}</p>
          ) : (
            <p className="itemDetail">No special Requests</p>
          )}
        </div>
        <div className="product-price" id="cupcakePrice">
          {item.Item.sizePrice}
        </div>
        <div className="product-quantity">
          <div className="product-price">{item.Item.quantity}</div>
          <div className="quantityEdit">
            <button onClick={() => AddItem()} className="feature__btnPlus">
              +
            </button>{" "}
            <button onClick={() => RemoveItem()} className="feature__btnMin">
              -
            </button>
          </div>
        </div>
        <button
          id="removeItem"
          className="feature__btn3"
          onClick={() => RemoveItemFromCart(item.index)}
        >
          Remove Item From Cart
        </button>
      </div>
    );
  }

  return finalElement;
};

export default CartItem;
