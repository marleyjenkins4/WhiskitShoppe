import React from 'react';
import OrdersList from './../OrdersList.js';
import Nav from "../Nav";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  return (
    <>
        <Nav />
        <div className='marginTop'>
          <OrdersList />
          <Link to="/admin" className="feature__btn" id = "back" >Back to Admin</Link>
        </div>
    </>
  )
}

export default AdminOrders;