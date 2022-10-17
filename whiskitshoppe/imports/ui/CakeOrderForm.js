import React, { useState, useEffect } from "react";
import { AddCakeToCart } from "../api/AddToCart";
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

const CakeOrderForm = (props) => {
  const { itemID } = props;
  const [tiers, setTiers] = useState(1);
  const [covering, setCovering] = useState();
  const [message, setMessage] = useState(false);
  const [cake, setCake] = useState(null);

  useEffect(() => {
    getCakeQuery();
  }, []);

  getCakeQuery = async () => {
    let db = getFirestore();
    const cakeRef = collection(db, "Menu2");
    const q = query(cakeRef, where("__name__", "==", itemID));

    const querySnapshot = await getDocs(q);
    let documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    setCake(documents);
  };

  const handleCake = (e) => {
    e.preventDefault();
    let data = e.target;
    AddCakeToCart(data);
    e.target.reset();

    // reset state
    setTiers(1);
    setCovering("");
    setMessage(false);

    toast("Added to Cart!", { autoClose: 7000 });
  };

  const CheckForNone = (value) => {
    if (isNaN(value)) {
      setTiers(1);
    } else {
      setTiers(value);
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleCake(e)} className="orderform2">
        {cake ? (
          <>
            <h1 className="orderTitle2">{cake[0].name}</h1>
            <input type="hidden" name="name" value={cake[0].name} />
          </>
        ) : (
          <div className="load-container">
            <div className="loader"></div>
          </div>
        )}
        {cake && cake[0].description ? (
          <p className="description">{cake[0].description}</p>
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
          {cake && cake[0].tiers != false ? (
            <label className="formLabel">
              How many tiers?
              <input
                type="number"
                defaultValue="1"
                min="1"
                max="4"
                name="tiers"
                onBlur={(e) => CheckForNone(e.target.valueAsNumber)}
                className="formInput"
              ></input>
            </label>
          ) : (
            <input type="hidden" name="tiers" value="1" />
          )}

          {[...Array(tiers)].map((x, i) => (
            <label key={i} className="formLabel">
              {tiers > 1 ? "What size for tier " + (i + 1) + "?" : "What size?"}
              <select name={"sizePrice" + i} required className="formInput">
                {cake &&
                  cake[0].sizePrice.map((size, index) => {
                    return (
                      <option key={index} value={size.size + " - Custom Price"}>
                        {size.size} - Custom Price
                      </option>
                    );
                  })}
              </select>
            </label>
          ))}

          {[...Array(tiers)].map((x, i) => (
            <label key={i} className="formLabel">
              {tiers > 1
                ? "Cake flavor for tier " + (i + 1) + ":"
                : "Cake flavor:"}
              <select name={"cakeFlavors" + i} required className="formInput">
                {cake &&
                  cake[0].flavors.map((flavor, index) => {
                    return (
                      <option key={index} value={flavor}>
                        {flavor}
                      </option>
                    );
                  })}
              </select>
            </label>
          ))}
          {cake && cake[0].covering ? (
            <label className="formLabel">
              {" "}
              What kind of covering?
              <select
                name="covering"
                onChange={(e) => setCovering(e.target.value)}
                className="formInput"
              >
                <option value=""> </option>
                <option value="Fondant">Fondant</option>
                <option value="Icing">Icing</option>
              </select>
            </label>
          ) : (
            <input
              type="hidden"
              name="covering"
              value=""
              className="formInput"
            />
          )}
          {covering == "Icing"
            ? [...Array(tiers)].map((x, i) => (
                <label className="formLabel">
                  {tiers > 1
                    ? "Icing flavor for tier " + (i + 1) + ":"
                    : "Icing flavor:"}
                  <select
                    key={i}
                    name={"icingFlavors" + i}
                    className="formInput"
                  >
                    {cake &&
                      cake[0].flavors.map((icing, index) => {
                        return (
                          <option key={index} value={icing}>
                            {icing}
                          </option>
                        );
                      })}
                  </select>
                </label>
              ))
            : [...Array(tiers)].map((x, i) => (
                <input
                  type="hidden"
                  key={i}
                  name={"icingFlavors" + i}
                  value=""
                  className="formInput"
                />
              ))}
          {covering == "Fondant" ? (
            <label className="formLabel">
              What kind of fondant?
              <select name="fondantType" className="formInput">
                <option value="2D">2D</option>
                <option value="3D">3D</option>
              </select>
            </label>
          ) : (
            <input
              type="hidden"
              name="fondantType"
              value=""
              className="formInput"
            />
          )}
          {cake && cake[0].fillings
            ? [...Array(tiers)].map((x, i) => (
                <label className="formLabel">
                  {tiers > 1
                    ? "Filling flavor for tier " + (i + 1) + ":"
                    : "Filling flavor:"}
                  <select
                    key={i}
                    name={"fillingFlavors" + i}
                    className="formInput"
                  >
                    {cake &&
                      cake[0].fillings.map((filling, index) => {
                        return (
                          <option key={index} value={filling}>
                            {filling}
                          </option>
                        );
                      })}
                  </select>
                </label>
              ))
            : [...Array(tiers)].map((x, i) => (
                <input
                  type="hidden"
                  key={i}
                  name={"fillingFlavors" + i}
                  value=""
                  className="formInput"
                />
              ))}
          {cake && cake[0].toppings ? (
            <label className="formLabel">
              Do you want toppings?
              <select name="topping">
                {cake &&
                  cake[0].toppings.map((topping, index) => {
                    return (
                      <option key={index + "topping"} value={topping}>
                        {topping}
                      </option>
                    );
                  })}
              </select>
            </label>
          ) : (
            <input
              type="hidden"
              name="topping"
              value=""
              className="formInput"
            ></input>
          )}
          <label className="formLabel">
            What should the message say?
            <input
              type="text"
              name="message"
              onBlur={() => setMessage(true)}
              className="formInput"
            ></input>
          </label>
          {message ? (
            <label className="formLabel">
              Where should the message be?
              <select name="messageLocation" className="formInput">
                <option value="on the cake">on the cake</option>
                <option value="on the board">on the board</option>
              </select>
            </label>
          ) : (
            <input
              type="hidden"
              name="messageLocation"
              value=""
              className="formInput"
            ></input>
          )}
          <label className="formLabel">
            Any special requests not mentioned above? <br></br>Please describe
            any decorations you would want on the cake as well.
            <br></br>
            <input
              type="textarea"
              name="special"
              className="formInputDeco"
            ></input>
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

export default CakeOrderForm;
