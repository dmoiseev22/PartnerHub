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
        const itemToAdd = event.target.id;
        console.log(itemToAdd)
        const updatedCart = { ...cart, [itemToAdd]: 1 };
        setCart(updatedCart)
        setInCart(true)
        saveToLocalStorageCart(updatedCart)
    }

    function removeItemFromCart(event) {
        const itemToRemove = event.target.id;
        const updatedCart = { ...cart }
        delete updatedCart[itemToRemove]
        saveToLocalStorageCart(updatedCart)
        setCart(updatedCart)
        setInCart(false)
    }

    const style = { 
        border:
            purpose === "primary" ? "1px solid  rgb(195, 19, 19)" : "none",
        borderRadius: "20px",
        padding: size === "big" ? ".5rem 1rem" : ".3rem .5rem",
        backgroundColor:
            purpose === "primary" ? "rgb(195, 19, 19)" : "transparent",
        color: purpose === "primary" ? "white" : "inherit",
        letterSpacing: "1px",
        transition: "all .2s ease-in-out",
        minWidth: "120px"
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
        minWidth: "120px"
    }


    if (!productCode) return
    if (cart == null) return

    return (
        <button
            className={className}
            style={(inCart && purpose === "primary") ? styleInCart : style}
            onClick={isLoggedIn ? handleClick : () => navigate("/login", { state: {"from": location.pathname} })}
            id={productCode}>
            {(inCart && purpose === "primary") ? "ADDED" : children}

        </button>
    )
}