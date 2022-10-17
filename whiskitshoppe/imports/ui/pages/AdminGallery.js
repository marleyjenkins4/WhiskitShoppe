import React, { useState } from "react";
import UploadForm from "./../UploadForm";
import ImageGridAdmin from "./../GridAdmin.js"
import Modal from "./../Modal.js"
import Nav from "../Nav";
import { Link } from "react-router-dom";

const AdminGallery = () => {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <>
            <Nav />
            <div className="marginTop">
                <UploadForm/>
                <ImageGridAdmin setSelectedImg={setSelectedImg} />
                { selectedImg && (
                    <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
                )}
                <Link to="/admin" className="feature__btn" id = "back">Back to Admin</Link>
            </div>
        </>
    )
}

export default AdminGallery;