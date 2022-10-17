import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { motion } from "framer-motion";

const ImageGrid = ({ setSelectedImg }) => {
  const [docs, setDocs] = useState([]);

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

  // Function to query all pictures then set the Docs state
  let db = getFirestore();

  var img_index = 1;
  const galleryRef = collection(db, "Gallery");
  const q = query(galleryRef);

  // Calls getQuery function when component changes
  useEffect(() => {
    getQuery();
  }, []);

  getQuery = async () => {
    setDocs("");
    const querySnapshot = await getDocs(q);
    let documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    setDocs(documents);
  };

  // Function that takes the searched term and queries for pics with that tag
  queryImg = async (e) => {
    // Prevent the default form redirect
    e.preventDefault();

    let db = getFirestore();
    let searchTerm = e.target.tagsSearch.value;
    const galleryRef = collection(db, "Gallery");
    const q = query(
      galleryRef,
      where("tags", "array-contains", searchTerm.toLowerCase())
    );
    e.target.tagsSearch.value = "";

    const querySnapshot = await getDocs(q);
    let documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    setDocs(documents);
  };

  // Form for tag search, img-grid iterates through docs from react state and animates images appearing
  // When picture clicked on, set selected state to pass into Modal
  return (
    <div>
      <form className="search" onSubmit={this.queryImg.bind(this)}>
        <input
          type="text"
          name="tagsSearch"
          className="tagsSearch"
          id="tagsSearch"
          placeholder="Search by tags or themes here"
        ></input>
        <br></br>
        <button className="feature__btn">Search</button>
      </form>
      <div className="search">
        <button
          type="button"
          className="feature__btn"
          onClick={this.getQuery.bind(this)}
        >
          Reset Search
        </button>
      </div>
      <div className="SearchLinks">
        <form onSubmit={this.queryImg.bind(this)}>
          <input
            type="hidden"
            name="tagsSearch"
            id="tagsSearch"
            value="cake"
          ></input>
          <br></br>
          <button className="buttonAsLink">Cake</button>
        </form>
        <form onSubmit={this.queryImg.bind(this)}>
          <input
            type="hidden"
            name="tagsSearch"
            id="tagsSearch"
            value="cupcakes"
          ></input>
          <br></br>
          <button className="buttonAsLink">Cupcakes</button>
        </form>
        <form onSubmit={this.queryImg.bind(this)}>
          <input
            type="hidden"
            name="tagsSearch"
            id="tagsSearch"
            value="mermaid"
          ></input>
          <br></br>
          <button className="buttonAsLink">Mermaid</button>
        </form>
        <form onSubmit={this.queryImg.bind(this)}>
          <input
            type="hidden"
            name="tagsSearch"
            id="tagsSearch"
            value="car"
          ></input>
          <br></br>
          <button className="buttonAsLink">Car</button>
        </form>
        <form onSubmit={this.queryImg.bind(this)}>
          <input
            type="hidden"
            name="tagsSearch"
            id="tagsSearch"
            value="unicorn"
          ></input>
          <br></br>
          <button className="buttonAsLink">Unicorn</button>
        </form>
      </div>
      <div className="img-grid">
        {docs &&
          docs.map((doc) => (
            <motion.div
              className="img-wrap"
              key={doc.id}
              layout
              whileHover={{ opacity: 1 }}
              s
              onClick={() => setSelectedImg(doc.url)}
            >
              <motion.img
                src={doc.url}
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default ImageGrid;
