import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import CakeOrderForm from "../CakeOrderForm";
import CookieBarSpecialtyOrderForm from "../CookieBarSpecialtyOrderForm";
import CupcakePieOrderForm from "../CupcakePieOrderForm";
import Nav from "../Nav";

const ItemDetail = () => {
  let { category, itemID } = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    getItemQuery();
  }, []);

  getItemQuery = async () => {
    let db = getFirestore();
    const cakeRef = collection(db, "Menu2");
    const q = query(cakeRef, where("__name__", "==", itemID));

    const querySnapshot = await getDocs(q);
    let documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    setItem(documents);
  };

  return (
    <>
      <div className="page-container removeScroll">
        <div className="content-wrap">
          <Nav />
          {item ? (
            <div>
              {category == "cookies" ||
              category == "bars" ||
              category == "specialty" ? (
                <div>
                  {item &&
                    item.map((itemStuff, index) => {
                      return (
                        <CookieBarSpecialtyOrderForm
                          key={index}
                          itemID={itemStuff.id}
                        />
                      );
                    })}
                </div>
              ) : (
                <span className="invisible"></span>
              )}
              {category == "cakes" ? (
                <div>
                  {item &&
                    item.map((itemStuff, index) => {
                      return (
                        <CakeOrderForm key={index} itemID={itemStuff.id} />
                      );
                    })}
                </div>
              ) : (
                <span className="invisible"></span>
              )}
              {category == "cupcakes" || category == "pies" ? (
                <div>
                  {item &&
                    item.map((itemStuff, index) => {
                      return (
                        <CupcakePieOrderForm
                          key={index}
                          itemID={itemStuff.id}
                        />
                      );
                    })}
                </div>
              ) : (
                <span className="invisible"></span>
              )}
            </div>
          ) : (
            <div className="load-container">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
