import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  getFirestore,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const OrdersList = () => {
  // Renders all active orders
  const [orders, setOrders] = useState([]);

  // Config info and making sure Firebase is initilized
  const firebaseConfig = {
    apiKey: "AIzaSyAEywtAAwj82AJvyhdBRlOR4H6tGEYnb3s",
    authDomain: "the-whisk-it-shoppe.firebaseapp.com",
    projectId: "the-whisk-it-shoppe",
    storageBucket: "the-whisk-it-shoppe.appspot.com",
    messagingSenderId: "511160632461",
    appId: "1:511160632461:web:13dee77d5a517e1d528ec4",
    measurementId: "G-59FPGFC1MP",
  };

  try {
    if (firebaseConfig && firebaseConfig.apiKey) {
      initializeApp(firebaseConfig);
    }
  } catch (e) {
    console.log("error:", e);
  }

  // On load, get orders
  useEffect(() => {
    getQuery();
  }, []);

  // Get all orders
  getQuery = async () => {
    let db = getFirestore();
    const galleryRef = collection(db, "Order");
    const q = query(galleryRef, orderBy("pickupDate"), orderBy("pickupTime"));

    const querySnapshot = await getDocs(q);
    let documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    setOrders(documents);
  };

  // Delete order from Order DB and upload it to ArchiveOrder DB
  archOrder = async (e, id) => {
    e.preventDefault();

    let db = getFirestore();
    const galleryRef = collection(db, "Order");
    const q = query(galleryRef, where("__name__", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      addDoc(collection(db, "ArchiveOrder"), {
        id: doc.id,
        email: doc.data().email,
        phoneNum: doc.data().phoneNum,
        pickupDate: doc.data().pickupDate,
        pickupTime: doc.data().pickupTime,
        orderPlaced: doc.data().orderPlaced,
      });
      await deleteDoc(doc.ref);
    });
    getQuery();
  };

  // Delete order from Order DB and upload it to ArchiveOrder DB
  emailOrder = async (e, id) => {
    e.preventDefault();
    let db = getFirestore();
    const galleryRef = collection(db, "Order");
    const q = query(galleryRef, where("__name__", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      addDoc(collection(db, "mail"), {
        to: 'whiskit',
        from: 'somebodyelse@example.com',
        message: {
          subject: 'Placed Order',
          html:  ' Users Email:   '+  doc.data().email + '   Users Phone Number:     ' + doc.data().phoneNum +
          '   Pick up Date For Order: ' + doc.data().pickupDate + '    Pick up time For Order:   ' + doc.data().pickupTime + 'Items Ordered: ' + doc.data().orderPlaced ,
        },
      })
    });
    getQuery();
  
  };




  
  // Update order info if customer changes it
  upOrder = async (e, id) => {
    e.preventDefault();

    let db = getFirestore();
    const galleryRef = collection(db, "Order");
    const q = query(galleryRef, where("__name__", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        pickupDate: e.target.pickupDate.value,
        pickupTime: e.target.pickupTime.value,
      });
      console.log("Doc Updated");
    });
    getQuery();
  };

  // Get items from order and format them to render
  cartItem = (items) => {
    return items.map((item, index) => {
      let type = item.$type;
      let finalElement;

      // Depending on type, render different info
      if (type == "CookieBarSpecialty") {
        finalElement = (
          <div className="product">
            <div className="product-details">
              <div className="product-title">{item.$value.name}</div>
              <p id="item">Size:</p>
              <p className="itemDetail">{item.$value.sizePrice}</p>
              <p id="item">Quantity:</p>
              <p className="itemDetail">{item.$value.quantity}</p>
              {item.$value.special != "" ? (
                <p id="item">Special Requests: {item.$value.special}</p>
              ) : (
                <p id="item">No special Requests</p>
              )}
            </div>
          </div>
        );
      } else if (type == "Cake") {
        finalElement = (
          <div className="product">
            <div className="product-details">
              <div className="product-title">{item.$value.name}</div>
              <p id="item">Size:</p>
              <p className="itemDetail">{item.$value.sizePrice}</p>
              <p id="item">Quantity:</p>
              <p className="itemDetail">{item.$value.quantity}</p>
              <p id="item">Number of Tiers: </p>
              <p className="itemDetail">{item.$value.tiers}</p>
              <p id="item">Cake Flavors:</p>
              {item.$value.cakeFlavors}
              {item.$value.covering != "" ? (
                <>
                  <p id="item">Covering: </p>
                  <p id="itemDetail">{item.$value.covering}</p>
                </>
              ) : (
                <span id="invisible"></span>
              )}
              {item.$value.icingFlavors != "" ? (
                <div>
                  <p id="item">Icing Flavors:</p>
                  {item.$value.icingFlavors}
                </div>
              ) : (
                <span className="invisible"></span>
              )}
              {item.$value.fondantType != "" ? (
                <>
                  <p id="item">Fondant Type: </p>
                  <p className="itemDetail">{item.$value.fondantType}</p>
                </>
              ) : (
                <span className="invisible"></span>
              )}
              {item.$value.fillingFlavors != "" ? (
                <div>
                  <p id="item">Filling Flavors:</p>
                  {item.$value.fillingFlavors}
                </div>
              ) : (
                <span className="invisible"></span>
              )}
              {item.$value.topping != "" ? (
                <>
                  <p id="item">Topping: </p>
                  <p className="itemDetail">{item.$value.topping}</p>
                </>
              ) : (
                <span className="invisible"></span>
              )}
              {item.$value.message != "" ? (
                <>
                  <p id="item">Message: </p>
                  <p className="itemDetail">{item.$value.message}</p>
                  <p id="item">Message Location: </p>
                  <p className="itemDetail">{item.$value.messageLocation}</p>
                </>
              ) : (
                <span className="invisible"></span>
              )}

              {item.$value.special != "" ? (
                <p id="item">Special Requests: {item.$value.special}</p>
              ) : (
                <p id="item">No special Requests</p>
              )}
            </div>
          </div>
        );
      } else if (type == "CupcakePie") {
        finalElement = (
          <div className="product">
            <div className="product-details">
              <div className="product-title">{item.$value.name}</div>
              <p id="item">Size:</p>
              <p className="itemDetail">{item.$value.sizePrice}</p>
              <p id="item">Quantity:</p>
              <p className="itemDetail">{item.$value.quantity}</p>
              <p className="itemDetail">Flavor: {item.$value.flavor}</p>
              {item.$value.special != "" ? (
                <p id="item">Special Requests: {item.$value.special}</p>
              ) : (
                <p id="item">No special Requests</p>
              )}
            </div>
          </div>
        );
      }
      return finalElement;
    });
  };

  return (
    <div>
      <h1 className="orderTitle">Order List</h1>

      <div className="AdminGrid2">
        {orders &&
          orders.map((order) => (
            <form
              key={order.id}
              onSubmit={(e) => this.upOrder(e, order.id)}
              className="list"
            >
              <div className="flexRow">
                <p>
                  <p className="bold">Date Placed:</p>{" "}
                  {new Date(
                    order.orderPlaced.seconds * 1000
                  ).toLocaleDateString("en-US")}
                </p>
                <p>
                  <p className="bold">Email:</p> {order.email}
                </p>
                <p>
                  <p className="bold">Phone Number:</p>
                  {order.phoneNum}
                </p>
                <p>
                  <p className="bold">Pickup Date: </p>
                  <input
                    type="date"
                    name="pickupDate"
                    className="inputOrder"
                    id={"pickupDate" + order.id}
                    defaultValue={order.pickupDate}
                  ></input>
                </p>
                <p>
                  <p className="bold">Pickup Time: </p>
                  <input
                    type="time"
                    name="pickupTime"
                    className="inputOrder"
                    id={"pickupTime" + order.id}
                    defaultValue={order.pickupTime}
                  ></input>
                </p>
                {cartItem(order.items)}
                <p>{order.orderNotes}</p>
                {order.url !== undefined ? (
                  <a href={order.url} target="_blank">
                    Attached Image
                  </a>
                ) : (
                  <></>
                )}
                <button type="submit" id="btn">
                  Update
                </button>
                <button onClick={(e) => this.archOrder(e, order.id)}>
                  Archive
                </button>
                <button onClick={(e) => this.emailOrder(e, order.id)}>
                  Send To Email
                </button>
              </div>
              <br />
            </form>
          ))}
      </div>
    </div>
  );
};

export default OrdersList;
