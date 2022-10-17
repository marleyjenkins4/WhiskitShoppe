import React, { useState, useEffect } from "react";
import { AddCookieBarSpecialtyToCart } from "../api/AddToCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import Nav from "../ui/Nav";
import Footer from "./Footer";

toast.configure();

const CookieBarSpecialtyOrderForm = (props) => {
  const { itemID } = props;
  const [cookie, setCookie] = useState(null);


  useEffect(() => {
    getCookieQuery();
  }, []);

  getCookieQuery = async () => {
    let db = getFirestore();
    const cakeRef = collection(db, "Menu2");
    const q = query(cakeRef, where("__name__", "==", itemID));

    const querySnapshot = await getDocs(q);
    let documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    setCookie(documents);
  };

  const handleCookieBarSpecialty = (e) => {
    e.preventDefault();
    let data = e.target;
    AddCookieBarSpecialtyToCart(data);
    e.target.reset();

    toast("Added to Cart!", { autoClose: 7000 });
  };

  return (
    <>
      <div className="page-container removeScroll">
        <div className="content-wrap">
          <Nav />
          <form
            onSubmit={(e) => handleCookieBarSpecialty(e)}
            className="orderform"
          >
            {cookie ? (
              <>
                <h1 className="orderTitle2">{cookie[0].name}</h1>
                <input type="hidden" name="name" value={cookie[0].name} />
              </>
            ) : (
              <div className="load-container"><div className="loader"></div></div>
            )}
            {cookie && cookie[0].description ? (
              <p className="description">{cookie[0].description}</p>
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
                  className="formInput"
                ></input>
              </label>
              <label className="formLabel">
                What size?
                <select name="sizePrice" required className="formInput">
                  {cookie &&
                    cookie[0].sizePrice.map((size, index) => {
                      return (
                        <option key={index} value={size.size + " - $" + size.price}>
                          {size.size} - ${size.price.toFixed(2)}
                        </option>
                      );
                    })}
                </select>
              </label>
              <label className="formLabel">
                Any special requests?
                <input
                  type="textarea"
                  name="special"
                  className="formInput"
                ></input>
              </label>
            </div>
            <button className="feature__btn" id="foot">
              Submit
            </button>
          </form>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CookieBarSpecialtyOrderForm;
