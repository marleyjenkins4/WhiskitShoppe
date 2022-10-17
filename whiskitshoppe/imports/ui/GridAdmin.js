import React, {useState} from 'react';
import { initializeApp } from 'firebase/app';
import { collection, query, where, getDocs, getFirestore, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { motion } from 'framer-motion';

const ImageGridAdmin = ({ setSelectedImg }) => {
  const [docs, setDocs] = useState([]);

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
      
  } catch (e) {
      console.log('error:', e);
  }

  // Function to query all pictures then set the Docs state
  getImages = async () => {
    let db = getFirestore();

    var img_index = 1;
    const galleryRef = collection(db, "Gallery");
    const q = query(galleryRef);

    const querySnapshot = await getDocs(q);
    let documents = [];
    querySnapshot.forEach((doc) => {
      
        documents.push({...doc.data(), id: doc.id});

    });
    setDocs(documents);
  }

  // Function that takes the searched term and queries for pics with that tag
  queryImg = async (e) => {
    // Prevent the default form redirect
    e.preventDefault();

    let db = getFirestore();
    let searchTerm = e.target.tagsSearch.value;
    const galleryRef = collection(db, "Gallery");
    const q = query(galleryRef, where("tags", "array-contains", searchTerm.toLowerCase()));

    const querySnapshot = await getDocs(q);
    let documents = [];
    querySnapshot.forEach((doc) => {
        documents.push({...doc.data(), id: doc.id});
    });
    setDocs(documents);
  }

  // Function that deletes image from both storage and firestore DB
  delImg = async(e, url) => {
    e.preventDefault();
    const storage = getStorage();
    const storageRef = ref(storage, url);

    let db = getFirestore();
    const galleryRef = collection(db, "Gallery");
    const q = query(galleryRef, where("url", "==", url));

    // Delete from DB
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async(doc) => {
      await deleteDoc(doc.ref);
    });

    // Delete from storage bucket
    deleteObject(storageRef).then(() => {
      getImages();
      console.log('File Deleted');
    }).catch((e) => {
      console.log('error:', e);
    });

  }

  // Form for tag search, img-grid iterates through docs from react state and animates images appearing
  // Pictures only show on button press to limit reads from DB
  // When picture clicked on, set selected state to pass into Modal
  return (
    <div>
      <form className='AdminGrid' onSubmit={this.queryImg.bind(this)}>
        <input type="text" name="tagsSearch" id="tagsSearch" placeholder='Search by tags or themes here'></input>
        <button className="feature__btn">Search</button>
      </form>
      <button onClick={getImages} className="feature__btn3" id = "viewGal">View Gallery Images</button>
      <div className="img-grid">
        {docs && docs.map(doc => (
          <div>
            <button id="delBtn" onClick={(e) => this.delImg(e, doc.url)}>Delete Image</button>
            <motion.div className="img-wrap" key={doc.id} 
              layout
              whileHover={{ opacity: 1 }}s
              onClick={() => setSelectedImg(doc.url)}
            >
              <motion.img src={doc.url} alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGridAdmin;