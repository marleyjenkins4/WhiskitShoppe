import React from 'react';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth } from 'firebase/auth';



const UploadForm = () => {

    // Listen to the form submission
    handleSubmit = async (e) => {
        // Prevent the default form redirect
        e.preventDefault();

        let db, auth;

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
            db = getFirestore();
            auth = getAuth();
        } catch (e) {
            console.log('error:', e);
        }

        // Split tags on commas
        var tagsString = e.target.pictureTags.value;
        const arr = tagsString.split(',');

        const tagsArray = arr.map(element => {
            return element.toLowerCase();
        });
        
        // Split path from the C:fakepath\ stuff
        var pathString = e.target.picturePath.value;
        const pathArray = pathString.split('fakepath\\');
        var pathString = pathArray[1];

        // Get file from form
        var file = document.getElementById('picturePath').files[0];

        // If file chosen, upload it to storage and enter it into Gallery collection        
        if(file == undefined){
            document.getElementById('error').innerHTML = "Please choose a file to upload";
        // If not, set error message
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
                const storageRef = ref(storage, 'images/'+shaHash);
                await uploadBytes(storageRef, file).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                });
            

                const createdAt = Date.now();
                const url = await getDownloadURL(storageRef);
                
                // Enter into DB
                addDoc(collection(db, 'Gallery'), {
                    hash: shaHash,
                    name: pathString,
                    tags: tagsArray,
                    url: url,
                    createdAt: createdAt,
                });
                document.getElementById('error').innerHTML = "";
            }
        }
                
        // Clear form inputs
        e.target.picturePath.value = '';
        e.target.pictureTags.value = '';
        
        // Return false to avoid redirect
        return false;
    };
    
    return (
        <div className='adminGal'>
            <p id="error"></p>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label className='upload'>Upload Picture: </label>
                <input className='upload' type="file" id="picturePath" /><br />
                <p className='upload'>Tags should be seperated by commas. Ex: mermaid,kids,pink</p>
                <label className='upload'>Tags: </label>
                <input type="text" id="pictureTags" /><br/>
                <button type="submit" className='feature__btn' id = "space">Send</button>
            </form>
        </div>
    );
}

export default UploadForm;