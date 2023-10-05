import React from "react";
import { Navigate, Link } from "react-router-dom"
import CustomButton from "../../components/buttons/CustomButton"
import blank from "../../assets/blades/blank.png"
import ProductEmojis from "./ProductDots";
import { CartContext } from "../../App";
import { getDataFromLocalStorage } from "../../util/util";
import Icon from "../../components/icons/Icon";





export default function Product( {product, isLoggedIn} ) {

    const [cart, setCart] = React.useContext(CartContext)
    const userData = getDataFromLocalStorage("partners-app-local-storage")

    if (!product?.description) return <h3>Loading 3...</h3>

    const cardColor = {
        backgroundColor: 
            product.series === "Red" ? "#ef1c1cd6"  
            : product.series === "Porcelanic" ? "#ef1c1cd6" 
            : product.series === "Orange" ? "orange"  
            : product.series === "Blue" ? "blue"  
            : product.series === "Green" ? "green" 
            : product.series === "Black" ? "#313131" 
            : "#919191"       
        }

    // GET THE CORRECT PRICE OR LOGIN MESSAGE FOR THE BUTTON

    const specialNetPrice = userData?.specialprices[product.code]
    const standardPrice = Number(product.price2023)
    const discountMultiplier = userData?.user.discount || 1
    const priceToDisplay = specialNetPrice || (standardPrice * discountMultiplier).toFixed(2) 

    const buttonText = isLoggedIn ? "€" + priceToDisplay : "Login for price"
    const toolHeight = product.b > 0 ? ` ${product.height}/${product.b}` : ` ${product.height}` 
    
    return (
        <div className="product-list-item" id={product.code}>
            <div className="product-card">
                <div className="product-card-range-color" style={cardColor}></div>

                <div className="product-card-top">
                    <div><p>art: {product.code}</p></div>
                </div>

                <Link to={`/tools/${product.code}`}>
                    <h2 className="product-card-heading">{product.description}</h2>
                </Link>

                <div className="product-card-details">

                    <div className="product-card-details-primary">
                        <div className="product-card-image">
                                <Link to={`/tools/${product.code}`}>
                                    <img
                                    loading="lazy"
                                    src={product.pictureSmall}
                                    // src={blank} 
                                    />         
                                </Link>           
                        </div>
                        <p>Ø    {`${product.diameter} X 
                                ${product.thick} X 
                                ${product.b > 0 ? `${product.height}/${product.b}` : product.height }`
                                } 
                        </p>
                        <p>{product.hole}</p>
                    </div>

                    <div className="product-card-details-secondary">
                        {/* <p className="product-card-description">{product.characteristics}</p> */}
                        <div className="product-card-technical">

                            <p className="product-card-technical-detail"><b>Diameter</b>: {product.diameter} mm </p>
                            <p className="product-card-technical-detail">
                                    <b>Height</b>: {toolHeight} mm</p>
                            {/* <p className="product-card-technical-detail"><b>Width</b>: {product.thick} mm </p> */}
                            <p className="product-card-technical-detail"><b>Materials</b>: {product.material.toLowerCase()} </p>
                            <p className="product-card-technical-detail"><b>Machines</b>: {product.machine.toLowerCase()} </p>

                            
                            <ProductEmojis 
                                life={product.life}
                                finish={product.finish}
                                speed={product.speed}
                            />

                            {/* <p className="product-card-technical-detail"><b>Machine</b>: {product.machine.toLowerCase()} </p> */}
                            <div className="product-card-technical-detail-icons">
                                <Icon i={product.technology} />
                                <Icon i={product.notch} />
                                <Icon i={product.type} />
                                <Icon i={product.machine} />
                                <Icon i={product.power} /> 
                            </div>
                            
                        </div>
                        <div className="product-card-buttons">


                            <Link className="product-card-details-link" to={`/tools/${product.code}`}>Details</Link>
                            
                            {/* <CustomButton 
                                className="product-card-button-secondary"
                                purpose="secondary"
                                size="normal"
                                productCode={product.code}
                            >
                                    <Link to={`/tools/${product.code}`}>Details</Link>
                            </CustomButton> */}
                            
                            <CustomButton
                                className="product-card-button-primary"   
                                purpose="primary"
                                size="big" 
                                productCode={product.code}
                                >
                                    {buttonText}
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}