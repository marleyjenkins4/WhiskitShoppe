import React from "react";
import Footer from "../Footer";
import Nav from "../Nav";

const Success = () => {
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <Nav />
          <div className="success">
            <h1>Thank you for placing your order!</h1>
            <p>
              We will contact you within the next 24 hours to finalize the
              details. If you have any questions, contact us at <span>(803) 366-3111.</span>
            </p>
            <img src="../img/whisk.png" alt="whisk graphic from logo" className="whisk" />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Success;
