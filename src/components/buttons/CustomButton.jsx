import React from "react";
import { CartContext } from "../../App";
import { saveToLocalStorageCart } from "../../util/util";
import { useNavigate, useLocation } from "react-router-dom";


export default function CustomButton({ children, purpose, size, className, productCode }) {

    const [cart, setCart] = React.useContext(CartContext)
    const [inCart, setInCart] = React.useState(cart[productCode] === undefined ? false : true)
    const isLoggedIn = localStorage.getItem("loggedin")

    const navigate = useNavigate()
    const location = useLocation()

    function handleClick(event) {
        if (purpose !== "primary") {
            return
        } else if (inCart) {
            removeItemFromCart(event)
        } else {
            addItemToCart(event)
        }
    }

    function addItemToCart(event) {
        let itemToAdd = event.target.id;
        let updatedCart = { ...cart, [itemToAdd]: 1 };
        setCart(updatedCart)
        setInCart(true)
        saveToLocalStorageCart(updatedCart)
    }

    function removeItemFromCart(event) {
        let itemToRemove = event.target.id;
        const updatedCart = { ...cart }
        delete updatedCart[itemToRemove]
        saveToLocalStorageCart(updatedCart)
        setCart(updatedCart)
        setInCart(false)
    }

    const style = { 
        border:
            purpose === "primary" ? "1px solid  #ef1c1cd6" : "none",
        borderRadius: "20px",
        padding: size === "big" ? ".5rem 1rem" : ".3rem .5rem",
        backgroundColor:
            purpose === "primary" ? "#ef1c1cd6" : "transparent",
        color: purpose === "primary" ? "white" : "inherit",
        letterSpacing: "1px",
        transition: "all .2s ease-in-out",
    }

    const styleInCart = {
        border: "1px solid grey",
        borderRadius: "20px",
        padding: size === "big" ? ".5rem 1rem" : ".3rem .5rem",
        backgroundColor:
            purpose === "primary" ? "grey" : "transparent",
        color: purpose === "primary" ? "white" : "inherit",
        letterSpacing: "1px",
        transition: "all .2s ease-in-out",
    }


    if (!productCode) return
    if (cart == null) return

    return (
        <button
            className={className}
            style={(inCart && purpose === "primary") ? styleInCart : style}
            onClick={isLoggedIn ? handleClick : () => navigate("/login", { state: {"from": location.pathname} })}
            id={productCode}>
            {(inCart && purpose === "primary") ? "Added" : children}

        </button>
    )
}