import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";

const CategoryList = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    getCategoriesQuery();
  }, []);

  getCategoriesQuery = async () => {
    let db = getFirestore();
    const cakeRef = collection(db, "Category");
    const q = query(cakeRef);

    const querySnapshot = await getDocs(q);
    let documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    setCategories(documents);
  };
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Nav />
        <div className="menu">
          <div className="slider--feature">
            <div className="priceDisc">
            <p>All prices listed are "starting at" prices. A more accurate estimate will be sent to you once your order has been reviewed.</p>
            <br/><p className="viewMenu">View the Full Menu Here:</p><br></br>
            </div>
            <a target="_blank" className = "feature__btn" href="https://firebasestorage.googleapis.com/v0/b/the-whisk-it-shoppe.appspot.com/o/menuImages%2Fmenu1.png?alt=media&token=24f42541-ba57-4000-b1ca-8b4fbeffdbab">Page 1  </a>
            <a target="_blank" className = "feature__btn" href="https://firebasestorage.googleapis.com/v0/b/the-whisk-it-shoppe.appspot.com/o/menuImages%2Fmenu2.png?alt=media&token=db354eb4-3911-403b-8370-c4e57ab2cc97"> Page 2</a>
          </div>
          {categories ? (
            <div className="menuGrid img-grid2">
              {" "}
              {categories &&
                categories.map((category, index) => {
                  return (
                    <Link to={"/menu/" + category.name} key={index}>
                      <figure>
                      <h1 className="menuName" id = "menuname">{category.name}</h1>
                      <div className="overlay2">
                      <div className="img-wrap2">
                        <img className="menuimg" src={category.url} alt="" id = "mobileMenu" />
                        </div>
                        </div>
                      </figure>
                    </Link>
                  );
                })}
            </div>
          ) : (
            <div className="load-container"><div className="loader"></div></div>
          )}
        </div>
        </div>

        <Footer />
    </div>
  );
};



export default CategoryList;
