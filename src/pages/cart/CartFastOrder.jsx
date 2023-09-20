import React from "react";
import Badge from "../../components/badge/Badge";

export default function CartFastOrder({ addUsualProducts, addRecommendedProducts }) {

    console.log('CART FAST ORDER RENDERED')

    return (
        <div className="cart-fast-order-wrapper">
                        
            <h4>Fast order</h4>
            <br />
            <h5>You can add your usual products or get personal recommendation</h5>
            
            <div className="cart-badge-description-wrapper">
                <div className="cart-badge-description-wrapper-inner">
                    <Badge badgeColor="blue" position="relative" />
                    <p> usual </p>
                </div>
                <div className="cart-badge-description-wrapper-inner">
                    <Badge badgeColor="rgb(48, 161, 69" position="relative" /><p> recommended</p>
                </div>
             </div>

            <div className="cart-order-add-options">
                <button
                    onClick={addUsualProducts}
                    className="add-to-cart-btn" >
                        USUAL 
                </button>


                <button
                    onClick={addRecommendedProducts}
                    className="add-to-cart-btn" >
                        RECOMMENDED
                </button>

            </div>
        </div>
    )
}