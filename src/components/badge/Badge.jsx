import React from "react"


export default function Badge({ productCode, userData, badgeColor, position, left }) {

    console.log(badgeColor)

    let badgeType
    if (userData?.recommended[productCode] !== undefined) {
        badgeType = "recommended"
    } else if (userData?.usualproducts[productCode] !== undefined) {
        badgeType = "usual"
    } else {
        badgeType = badgeColor || null
    }
    console.log(productCode)

    const style = {
        backgroundColor: badgeType === "recommended" ? "rgb(48, 161, 69" : badgeType === "usual" ? "blue" : badgeType,
        position: position,
        left: left,
        display: "inline-block"
    }
    
    return (
        <div style={style} className="badge">
        </div>
    )
}