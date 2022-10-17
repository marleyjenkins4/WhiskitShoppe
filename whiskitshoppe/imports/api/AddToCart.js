import React from "react";
import { Session } from "meteor/session";
import { Cake, CookieBarSpecialty, CupcakePie } from "../api/MenuTypes";

/* The Cart Key will hold an array that conatins all of the cart items.*/

/* Function for adding the CookieBarSpecialty class to the cart. Needs to be passed in the
data from event.target */
function AddCookieBarSpecialtyToCart(data) {
  let name = data.name.value;
  let quantity = data.quantity.value;
  let sizePrice = data.sizePrice.value;
  let special = data.special.value;

  let Item = new CookieBarSpecialty(name, quantity, sizePrice, special);

  // get the cart array from session
  let cart = Session.get("Cart");

  // push the item into the copy of the cart list
  cart.push(Item);

  // reset the cart variable with the new list
  Session.setPersistent("Cart", cart);
}

/* Function for adding the Cake class to the cart. This will keep up with setting the keys. Needs to be passed in the
data from event.target */

// new Cake(string name, int quantity, int sizePrice, int tier, array cakeFlavors, string covering, array icingFlavors(null), string fondantType(null), array fillingFlavors(null), string topping(null), string messageLocation(null), string message(null), string special)
function AddCakeToCart(data) {
  let name = data.name.value;
  let quantity = data.quantity.value;
  let tiers = data.tiers.valueAsNumber;
  // create array for the size price for the cases of tiers
  var sizePrice = [];
  sizePrice.push(data.sizePrice0.value);
  if (tiers > 1) {
    sizePrice.push(data.sizePrice1.value);
  }
  if (tiers > 2) {
    sizePrice.push(data.sizePrice2.value);
  }
  if (tiers > 3) {
    sizePrice.push(data.sizePrice3.value);
  }
  // create array for cake flavors
  var cakeFlavors = [];
  cakeFlavors.push(data.cakeFlavors0.value);
  if (tiers > 1) {
    cakeFlavors.push(data.cakeFlavors1.value);
  }
  if (tiers > 2) {
    cakeFlavors.push(data.cakeFlavors2.value);
  }
  if (tiers > 3) {
    cakeFlavors.push(data.cakeFlavors3.value);
  }
  let covering = data.covering.value;
  // create array for icing flavors
  var icingFlavors = [];
  if (data.icingFlavors0 != undefined) {
    icingFlavors.push(data.icingFlavors0.value);
    if (tiers > 1) {
      icingFlavors.push(data.icingFlavors1.value);
    }
    if (tiers > 2) {
      icingFlavors.push(data.icingFlavors2.value);
    }
    if (tiers > 3) {
      icingFlavors.push(data.icingFlavors3.value);
    }
  }
  let fondantType = data.fondantType.value;
  // create array for filling flavors
  var fillingFlavors = [];
  if(data.fillingFlavors0 != undefined) {
    fillingFlavors.push(data.fillingFlavors0.value);
    if (tiers > 1) {
      fillingFlavors.push(data.fillingFlavors1.value);
    }
    if (tiers > 2) {
      fillingFlavors.push(data.fillingFlavors2.value);
    }
    if (tiers > 3) {
      fillingFlavors.push(data.fillingFlavors3.value);
    }
  }
  let topping = data.topping.value;
  let message = data.message.value;
  let messageLocation = data.messageLocation.value;
  let special = data.special.value;

  let Item = new Cake(
    name,
    quantity,
    sizePrice,
    tiers,
    cakeFlavors,
    covering,
    icingFlavors,
    fondantType,
    fillingFlavors,
    topping,
    message,
    messageLocation,
    special
  );

  // get the cart array from session
  let cart = Session.get("Cart");

  // push the item into the copy of the cart list
  cart.push(Item);

  // reset the cart variable with the new list
  Session.setPersistent("Cart", cart);
}

/* Function for adding the CupcakePie class to the cart. This will keep up with setting the keys. Needs to be passed in the
data from event.target */
function AddCupcakePieToCart(data) {
  let name = data.name.value;
  let quantity = data.quantity.value;
  let sizePrice = data.sizePrice.value;
  let flavor = data.flavor.value;
  let special = data.special.value;

  let Item = new CupcakePie(name, quantity, sizePrice, flavor, special);

  // get the cart array from session
  let cart = Session.get("Cart");

  // push the item into the copy of the cart list
  cart.push(Item);

  // reset the cart variable with the new list
  Session.setPersistent("Cart", cart);
}

function RemoveItemFromCart(index) {
  let cart = Session.get("Cart");
  let beginingArray = cart.slice(0, index);
  let endArray = cart.slice(index + 1);
  let newCart = beginingArray.concat(endArray);

  // Set Cart session with the new cart with the item removed
  Session.setPersistent("Cart", newCart);
  console.log("Item removed");
}

function EditItemInCart(index, item) {
    let cart = Session.get("Cart");

    // replace the item at the current index with the updated item
    cart[index] = item;

    // Set the Cart session with the updated array
    Session.setPersistent("Cart", cart);
}

export {
  AddCookieBarSpecialtyToCart,
  AddCakeToCart,
  AddCupcakePieToCart,
  RemoveItemFromCart,
  EditItemInCart
};
