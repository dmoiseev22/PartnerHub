import React from "react";

export default function ProductsInCartHeading({ clearCart, trash }) {

    console.log("product incart heading rerendering")


    return (
        <div className="product-in-cart-wrapper title">
                        
            <p className="cart-product-code table-heading"><b>Code</b></p>
            <p className="cart-product-description table-heading"><b>Description</b></p>
            <p className="cart-product-listprice table-heading"><b>List price</b></p>
        
            <p className="cart-product-finalprice table-heading"><b>Price</b></p>
        
            <p className="cart-product-quantity table-heading"><b>Qty</b></p>
            <p className="cart-product-total table-heading"><b>Total</b></p>
            <div  
                className="cart-product-remove table-heading"
                onClick={clearCart}
            ><img src={trash}/>
            </div>
        </div>
    )
   
}
