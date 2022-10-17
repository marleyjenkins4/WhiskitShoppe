import React, { useState } from "react";
import UploadForm from "./../UploadForm";
import ImageGrid from "./../ImageGrid.js"
import Modal from "./../Modal.js"
import Nav from "../Nav"
import Footer from "../Footer";


const Gallery = () => {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <div className="page-container">
        <div className="content-wrap">
        <Nav />
        <div className="grid">
        <>
            <ImageGrid setSelectedImg={setSelectedImg} />
            { selectedImg && (
                <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            )}
        </>
        </div>
        <Footer />

        </div>
        </div>
    )
}

export default Gallery;