import React, { useState, useEffect } from "react";
import { AddCupcakePieToCart } from "../api/AddToCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import Footer from "./Footer";

toast.configure();

const CupcakePieOrderForm = (props) => {
  /* Uncomment the next line and comment like 26 when connected with the menu */
  const { itemID } = props;
  const [cupcake, setCupcake] = useState(null);

  // for testing purposes I will manually put in itemIDs
  // let itemID = "RdmghAy4ccgPhVRwaxO2";

  useEffect(() => {
    getCupcakeQuery();
  }, []);

  getCupcakeQuery = async () => {
    let db = getFirestore();
    const cakeRef = collection(db, "Menu2");
    const q = query(cakeRef, where("__name__", "==", itemID));

    const querySnapshot = await getDocs(q);
    let documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    setCupcake(documents);
  };

  const handleCupcakePie = (e) => {
    e.preventDefault();
    let data = e.target;
    AddCupcakePieToCart(data);
    e.target.reset();

    toast("Added to Cart!", { autoClose: 7000 });
  };

  return (
    <>
      <form onSubmit={(e) => handleCupcakePie(e)} className="orderform">
        {cupcake ? (
          <>
            <h1 className="orderTitle2">{cupcake[0].name}</h1>
            <br></br>
            <input type="hidden" name="name" value={cupcake[0].name} />
          </>
        ) : (
          <div className="load-container">
            <div className="loader"></div>
          </div>
        )}
        {cupcake && cupcake[0].description ? (
          <p className="description">{cupcake[0].description}</p>
        ) : (
          <span className="invisible"></span>
        )}
        <div className="formField">
          <label className="formLabel">
            How many?
            <input
              required
              type="number"
              defaultValue="1"
              min="1"
              name="quantity"
              className="formInput1"
            ></input>
          </label>
          <label className="formLabel">
            What size?
            <select name="sizePrice" required className="formInput2">
              {cupcake && cupcake[0].category == "pies" &&
                cupcake[0].sizePrice.map((size, index) => {
                  return (
                    <option key={index} value={size.size + " - $" + size.price}>
                      {size.size} - ${size.price.toFixed(2)}
                    </option>
                  );
                })}
              {cupcake && cupcake[0].category == "cupcakes" &&
                cupcake[0].sizePrice.map((size, index) => {
                  return (
                    <option key={index} value={size.size + " - Custom Price"}>
                      {size.size} - Custom Price
                    </option>
                  );
                })}
            </select>
          </label>
          <label className="formLabel">
            What flavor?
            <select name="flavor" required className="formInput">
              {cupcake &&
                cupcake[0].flavors.map((flavor, index) => {
                  return (
                    <option key={index} value={flavor}>
                      {flavor}
                    </option>
                  );
                })}
            </select>
          </label>
          <label className="formLabel2">
            Any special requests?
            <input type="textarea" name="special" className="formInput"></input>
          </label>
        </div>
        <button className="feature__btn" id="foot">
          Submit
        </button>
      </form>
      <Footer />
    </>
  );
};

export default CupcakePieOrderForm;
