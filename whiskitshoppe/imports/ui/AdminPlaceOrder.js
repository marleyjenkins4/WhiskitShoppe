import React from "react";
import { addDoc, getFirestore, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const AdminPlaceOrder = () => {
  // Allow admin to add orders 
  handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {

      // Get form inputs
      const orderPlaced = e.target.datePlaced.value;
      const email = e.target.userEmail.value;
      const pickupTime = e.target.pickupTime.value;
      const pickupDate = e.target.pickupDate.value;
      const userNumber = e.target.userNumber.value;
      
      let db = getFirestore();
      addDoc(collection(db, 'Order'), {
        email: email,
        phoneNum: userNumber,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
        orderPlaced: orderPlaced,
      });

      // Clear form inputs
      e.target.datePlaced.value = '';
      e.target.userEmail.value = '';
      e.target.pickupTime.value = '';
      e.target.pickupDate.value = '';
      e.target.userNumber.value = '';
      console.log('An order has been submitted');
    }
  }
  
  return (
    <>
      <div>
        <div className='flexRow'>
          <p>Order Placed</p>
          <p>Email</p>
          <p>Phone Number</p>
          <p>Pickup Date</p>
          <p>Pickup Time</p>
        </div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="date" name="datePlaced"></input>
          <input type="email" name="userEmail" placeholder="ex@example.com"></input>
          <input type="tel" name="userNumber" placeholder='333-333-3333' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'></input>
          <input type="date" name="pickupDate"></input>
          <input type="time" name="pickupTime"></input>
          <button>submit</button>
        </form>
      </div>
    </>
  );
}

export default AdminPlaceOrder;