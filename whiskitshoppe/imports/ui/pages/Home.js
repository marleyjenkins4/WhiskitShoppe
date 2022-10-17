import React from "react";
import Nav from "../Nav";
import Slider from "../components/Slider";
import Images from "../images";
import { Link } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { Session } from "meteor/session";
import Footer from "../Footer";


const Home = () => {
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

  getAdmin = async () => {

    let db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    let documents = [];
    const galleryRef = collection(db, "users");
    const q = query(
      galleryRef,
      where('__name__', "==", uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let arr = doc.data().roles;
      if(arr.includes("admin")){
        Session.setPersistent("Admin", "true");
      }
    });
  };
  getAdmin();

  

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Nav />

        <Slider images={Images} />

        <div className="container">
          <div className="storeInfo">
            <h1 className="title"> Location and Hours </h1>
            <ul>
              <li className="location">
                1204 Mt. Gallant Rd, Rock Hill, SC 29732
              </li>
              <li className="infoDay"> Sunday - Monday</li>
              <li className="info"> Closed</li>
              <li className="infoDay">Tuesday - Thursday</li>
              <li className="info"> 10:00 am - 6:00 pm</li>
              <li className="infoDay">Friday</li>
              <li className="info"> 10:00 am - 5:00 pm</li>
            </ul>
          </div>
        </div>
        <div className="container">
          <div className="about">
            <div className="content">
              <h1 className="aboutTitle"> The Whisk It Story </h1>
              <p className="aboutContent">
                {" "}
                Hi! My name is Jessie and I am the owner of The Whisk It Shoppe!
                I am currently the only baker and decorator in the shop, but I
                have family that occasionally comes to help...{" "}
              </p>
              <Link to="/about" className="feature__btn2">
                Full Story
              </Link>
            </div>
          </div>
        </div>

            
      <Footer />

      </div>
    </div>
  );
};



export default Home;
