import React from "react";
import { Link } from "react-router-dom";

export default function Notice({ closeModal }) {

    return(
            <div className="modal sent-confirmation">
                
                <h3>We received your request!</h3>
                <p>You personal manager will contact you soon. </p>

                <div className="modal-butons">
                    <Link
                        to="">
                        <button className="accept" onClick={closeModal}>
                            OK
                        </button>
                    </Link>
                </div>
            </div>
    )
}