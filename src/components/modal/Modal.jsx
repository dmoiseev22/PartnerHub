import React from "react";
import { Link } from "react-router-dom";

export default function Modal({ closeModal }) {

    return(
            <div className="modal">
                
                <h3>Cookie consent</h3>

                <p>This website uses cookies that help the website to function and also to track how you interact with our website. 
                    But for us to provide the best user experience click on Accept</p>

                <div className="modal-butons">

                    <Link
                        to="">

                        <button className="reject" onClick={closeModal}>
                            Reject 
                        </button>
                    
                    </Link>

                    <Link
                        to="">

                        <button className="accept" onClick={closeModal}>
                            Accept
                        </button>
                    
                    </Link>

                </div>

            </div>
    )
}