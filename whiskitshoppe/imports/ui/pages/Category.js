import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";
import { motion } from "framer-motion";

const Category = () => {
  let { category } = useParams();
  const [categorylist, setCategorylist] = useState();

  useEffect(() => {
    getCategoryQuery();
  }, []);

  getCategoryQuery = async () => {
    let db = getFirestore();
    const cakeRef = collection(db, "Menu2");
    const q = query(cakeRef, where("category", "==", category));

    const querySnapshot = await getDocs(q);
    let documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    setCategorylist(documents);
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Nav />

        <div className="menu">
          <div className="menuGrid">
            <>
              {categorylist ? (
                <div className="menuGrid img-grid2">
                  {" "}
                  {categorylist &&
                    categorylist.map((item, index) => {
                      return (
                        <Link
                          to={"/menu/" + category + "/" + item.id}
                          key={index}
                        >
                          <figure>
                            <h1 className="menuName">{item.name}</h1>
                            {item.url ? (
                              <div className="overlay2">
                                <motion.div className="img-wrap2">
                                  <motion.img
                                    className="menuimg"
                                    src={item.url}
                                    alt=""
                                  />
                                </motion.div>
                              </div>
                            ) : (
                              <div className="img-wrap2">
                                <div className="wrap">
                                  <div className="colorblock"></div>
                                </div>
                              </div>
                            )}
                          </figure>
                        </Link>
                      );
                    })}
                </div>
              ) : (
                <div className="load-container">
                  <div className="loader"></div>
                </div>
              )}
            </>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Category;
