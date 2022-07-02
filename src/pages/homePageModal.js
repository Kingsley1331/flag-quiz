import React from "react";
import { useParams, Link } from "react-router-dom";

function HomePageModal(props) {
    const closeModal = () => {
        props.setHomePageShowModal(false);
    };

    return (
        <div>
            <h2>Go back to home page</h2>
            Your progress will be lost are you still sure you want to go back to
            the home page?
            <button>
                <Link to="/"> Yes</Link>
            </button>
            <button onClick={closeModal}> No</button>
        </div>
    );
}

export default HomePageModal;
