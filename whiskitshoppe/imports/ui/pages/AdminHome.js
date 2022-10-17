import React from 'react';
import { Link } from "react-router-dom";
import Nav from "../Nav";

const AdminHome = () => {
  return (
    <>  
      <Nav />
      <div className='marginTop flex'>
        <Link to="/adminGallery" className="feature__btn">Gallery Upload/Delete</Link>
        <Link to="/adminOrders" className="feature__btn">List of Active Orders</Link>
      </div>
    </>
  );
};

export default AdminHome;