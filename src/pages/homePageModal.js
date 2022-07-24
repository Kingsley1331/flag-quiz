import React from "react";
import { useParams, Link } from "react-router-dom";

function HomePageModal(props) {
    const closeModal = () => {
        props.setHomePageShowModal(false);
    };

    return (
        <div className="modal-div">
            <h2>Go back to home page</h2>
            Your progress will be lost are you still sure you want to go back to
            the home page?
            <div className="buttons-container">
                <Link to="/">
                    <span>Yes</span>
                </Link>

                <p onClick={closeModal}> No</p>
            </div>
        </div>
    );
}

export default HomePageModal;
