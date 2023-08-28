import React from "react";
import heart from "../../assets/heart.svg"
import CustomButton from "../../components/buttons/CustomButton"
import blank from "../../assets/blades/blank.png"

export default function Product( {product} ) {
    // console.log(product)

    function handleClick(event) {
        console.log(event.target.id)
    }

    const cardColor = {
        backgroundColor: 
            product.series === "Red" ? "red"  
            : product.series === "Porcelanic" ? "red" 
            : product.series === "Orange" ? "orange"  
            : product.series === "Blue" ? "blue"  
            : product.series === "Green" ? "green" 
            : product.series === "Black" ? "black" 
            : "grey"       
    }

    return (
        <div className="product-list-item" id={product.code}>
            <div className="product-card">
                <div className="product-card-range-color" style={cardColor}></div>

                <div className="product-card-top">
                    <div><p>art: {product.code}</p></div>
                    <div onClick={handleClick} id="product.code">
                        <img src={heart}/>
                    </div>
                </div>

                <h2 className="product-card-heading">{product.description}</h2>

                <div className="product-card-details">

                    <div className="product-card-details-primary">
                        <div className="product-card-image">
                            <img
                                loading="lazy"
                                src={blank} 
                            />                    
                        </div>
                        <p>Ø{product.diameter} X {product.thick} X {product.height}</p>
                        <p>{product.hole}</p>
                    </div>

                    <div className="product-card-details-secondary">
                        <p className="product-card-description">{product.characteristics}</p>
                        <div className="product-card-technical">
                            <p className="product-card-technical-detail"><b>Materials</b>: {product.material.toLowerCase()} </p>
                            <p className="product-card-technical-detail"><b>Machines</b>: {product.machine.toLowerCase()} </p>
                        </div>
                        <div className="product-card-buttons">
                            <CustomButton 
                                className="product-card-button-secondary"
                                purpose="secondary"
                                size="normal"
                            >
                                    Details
                            </CustomButton>
                            <CustomButton 
                                className="product-card-button-primary"
                                purpose="primary"
                                size="big">
                                    Order now
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}