import React from "react"


export default function Badge({ productCode, userData, badgeColor, position, left }) {

    let badgeType
    
    if (userData?.recommended[productCode] !== undefined) {
        badgeType = "recommended"
    } else if (userData?.usualproducts[productCode] !== undefined) {
        badgeType = "usual"
    } else {
        badgeType = badgeColor || null
    }

    const style = {
        backgroundColor: badgeType === "recommended" ? "rgb(48, 161, 69" : badgeType === "usual" ? "blue" : badgeType,
        position: position,
        left: left,
        display: "inline-block"
    }
    
    return (
        <div 
            style={style} 
            className="badge">
        </div>
    )
}