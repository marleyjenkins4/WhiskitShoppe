import React from "react";
import { initializeApp } from 'firebase/app';
import { addDoc, getFirestore, collection, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { Session } from "meteor/session";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();


const PlaceOrder = () => {
  // Listen to the form submission
  handleSubmit = async (e) => {
    // Prevent the default form redirect
    e.preventDefault();

    // Config info and making sure Firebase is initilized
    const firebaseConfig = {
        apiKey: 'AIzaSyAEywtAAwj82AJvyhdBRlOR4H6tGEYnb3s',
        authDomain: 'the-whisk-it-shoppe.firebaseapp.com',
        projectId: 'the-whisk-it-shoppe',
        storageBucket: 'the-whisk-it-shoppe.appspot.com',
        messagingSenderId: '511160632461',
        appId: '1:511160632461:web:13dee77d5a517e1d528ec4',
        measurementId: 'G-59FPGFC1MP',
    };

    try {
        if (firebaseConfig && firebaseConfig.apiKey) {
            initializeApp(firebaseConfig);
        }
    } catch (error) {
        console.log('error:', error);
    }

    // Get file from form
    var file = document.getElementById('picturePath').files[0];

    // If file chosen, upload it to storage and enter it into Gallery collection        
    if(file == undefined){
      // If not, just upload other info

      // Get current user's email
      const auth = getAuth();
      const user = auth.currentUser;
      const email = user.email;
      const uid = user.uid;
      
      // Get inputs from form
      const pickupTime = e.target.pickupTime.value;
      const pickupDate = e.target.pickupDate.value;
      const userNumber = e.target.userNumber.value;
      const userNotes = e.target.userNotes.value;
      
      // Get Cart items
      let jsonObj = CartList();
      let db = getFirestore();
      // Add doc to DB
      addDoc(collection(db, 'Order'), {
        email: email,
        phoneNum: userNumber,
        orderNotes: userNotes,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
        orderPlaced: serverTimestamp(),
        items: jsonObj,
      });
           //email notifcation will be sent to orders@thewhiskitshoppe.com
           addDoc(collection(db, "mail"), {
            to: 'orders@thewhiskitshoppe.com',
            cc: 'whiskitshoppe@gmail.com',
            message: {
              subject: 'New Order Placed',
              html: "<ul><li>Customer's email:   "+ email + '</li><li>Users Phone Number:     ' + userNumber +'</li><li>Notes (if any recieved):     '+ 
                userNotes + '</li><li>Pick up Date For Order: ' + pickupDate + '</li><li>Pick up time For Order:   ' + pickupTime + '</li><li>Items Ordered: ' + JSON.stringify(jsonObj) + "</li></ul>",
            },
          })
       
      // Clear form inputs
      e.target.pickupTime.value = '';
      e.target.pickupDate.value = '';
      e.target.userNumber.value = '';
      e.target.userNotes.value = '';
      console.log('An order has been submitted');
      Session.clearPersistent("Cart");
      toast("Your order has been placed!", { autoClose: 7000 });
      window.location.replace("/success");
    } else {
        // SHA encryption code taken from https://codepen.io/dulldrums/pen/RqVrRr
        // start a new instance of FileReader
        const reader = new FileReader();
    
        // provide an onload callback for this instance of FileReader
        // this is called once reader.readAsArrayBuffer() is done
        reader.onload = () => {
            const fileResult = reader.result;
            
            crypto.subtle.digest('SHA-256', fileResult).then((hash) => {
                var sha256result = hex(hash);
                // this should contain your sha-256 hash value
                uploadFile(sha256result);
            });
        };
    
        // calling reader.readAsArrayBuffer and providing a file should trigger the callback above 
        // as soon as readAsArrayBuffer is complete
        reader.readAsArrayBuffer(file);
        
        function hex(buffer) {
            var hexCodes = [];
            var view = new DataView(buffer);
            for (var i = 0; i < view.byteLength; i += 4) {
                var value = view.getUint32(i)
                var stringValue = value.toString(16)
                var padding = '00000000'
                var paddedValue = (padding + stringValue).slice(-padding.length)
                hexCodes.push(paddedValue);
            }
        
          return hexCodes.join("");
        }

        // Pass in the hash and upload to storage and DB
        uploadFile = async (shaHash) => {
            // Create reference to firebase storage bucket and upload to bucket
            const storage = getStorage();
            const storageRef = ref(storage, 'userUploads/'+shaHash);
            await uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        
            // Get current user's email
            const auth = getAuth();
            const user = auth.currentUser;
            const email = user.email;
            const uid = user.uid;

            // Get values from form
            const pickupTime = e.target.pickupTime.value;
            const pickupDate = e.target.pickupDate.value;
            const userNumber = e.target.userNumber.value;
            const userNotes = e.target.userNotes.value;
            const createdAt = Date.now();
            const url = await getDownloadURL(storageRef);
            
            // Get cart items
            let jsonObj = CartList();
            let db = getFirestore();
            // Add doc to DB
            addDoc(collection(db, 'Order'), {
              email: email,
              phoneNum: userNumber,
              orderNotes: userNotes,
              pickupDate: pickupDate,
              pickupTime: pickupTime,
              orderPlaced: serverTimestamp(),
              url: url,
              hash: shaHash,
              items: jsonObj,
            });
            //email notifcation will be sent to orders@thewhiskitshoppe.com
           addDoc(collection(db, "mail"), {
            to: 'orders@thewhiskitshoppe.com',
            cc: 'whiskitshoppe@gmail.com',
            message: {
              subject: 'New Order Placed',
              html: "<ul><li>Customer's email:   " + email + '</li><li>Users Phone Number:     ' + userNumber + '</li><li>Notes (if any recieved):     ' +
                userNotes + '</li><li>Pick up Date For Order: ' + pickupDate + '</li><li>Pick up time For Order:   ' + pickupTime + '</li><li>Items Ordered: ' + JSON.stringify(jsonObj) + "</li></ul>",
            },
          })
            // Clear form values
            e.target.pickupTime.value = '';
            e.target.pickupDate.value = '';
            e.target.userNumber.value = '';
            e.target.userNotes.value = '';
            e.target.picturePath.value = '';
            Session.clearPersistent("Cart");
            console.log('An order has been submitted');
            toast("Your order has been placed!", { autoClose: 7000 });
            window.location.replace("/success");
        }
    }
  };


  // Get Session items so they can be sent with other order info
  const CartList = () =>{
    let cartItems = Session.get("Cart");
    let finalCart = [];
    cartItems.map((item, index) => {
      let jsonObj = EJSON.stringify(item);
        jsonObj = JSON.parse(jsonObj);
        finalCart.push(jsonObj);
        return finalCart;
    });
    return finalCart;
  }
  
  return (
      <form onSubmit={(e) => this.handleSubmit(e)} className="placeOrder">
        <div className="input">
          <label htmlFor="userNumber">Phone Number</label>
          <input type="tel" required name="userNumber"className="input1" placeholder='XXX-XXX-XXXX' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'></input>
          <label htmlFor="userNumber">Pickup Date</label>
          <input type="date" required name="pickupDate" className="input2"></input>
          <label htmlFor="userNumber">Pickup Time</label>
          <input type="time" required name="pickupTime" className="input1"></input><br></br>
        </div>
        <textarea name="userNotes" rows='4' cols='50' placeholder="Add Any Extra Notes or special Requests Here"></textarea><br></br>
      <label htmlFor="picturePath" className="fileLabel">If you have a picture, you can attach it here </label>
        <input type="file" id="picturePath" /><br></br>
        <button className="feature__btn">Confirm Order</button>
      </form>
  );
};

export default PlaceOrder;
