import React from "react";
import { Link } from "react-router-dom"; 

export default function EmptyCart({ addUsualProducts, addRecommendedProducts }) {

    return (
        <div className="empty-cart">
            <h2>Your cart is empty  </h2>
            
            <div className="empty-cart-buttons">
                <p>You can
                    <span className="add-usual-span" onClick={addUsualProducts}>add usual</span>products or explore new tools</p>

                <Link to="../../tools">
                <button
                    className="login-button" 
                    aria-label="explore tools">
                    EXPLORE 
                </button>
                </Link>
            </div>

        </div>
    )
}