import React from "react";

export default function CustomButton({ children, purpose, size, className }) {

    const style = {
        border: "1px solid red",
        borderRadius: "8px",
        padding: size === "big" ? ".5rem 1rem" : ".3rem .5rem",
        backgroundColor: purpose === "primary" ? "red" : "none",
        color: purpose === "primary" ? "white" : "inherit",
        textDecoration: purpose === "primary" ? "underline" : "none",
        letterSpacing: "1px",
        transition: "all .2s ease-in-out"
    }

    return (
        <button className={className} style={style}>
            {children}
        </button>
    )
}