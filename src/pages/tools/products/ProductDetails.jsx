import React from "react";
import { useParams, Link, useLocation } from "react-router-dom"
import { PricelistContext } from "../../../App"
import ScaleLoader from 'react-spinners/ScaleLoader'

import ProductDots from "./ProductDots";
import CustomButton from "../../../components/buttons/CustomButton";
import Icon from "../../../components/icons/Icon";
import leftArrow from "../../../assets/fa-icons/left-arrow.svg"
import rightArrow from "../../../assets/fa-icons/right-arrow.svg"
import file from "../../../assets/fa-icons/file-regular.svg"


export default function ProductDetails() {
    const pricelist = React.useContext(PricelistContext)

    const userData = JSON.parse(window.localStorage.getItem("partners-app-local-storage"))
    const isLoggedIn = localStorage.getItem("loggedin")
    const { id } = useParams()

    if (pricelist.length < 1) return <h3>Loading...</h3>

    const product = pricelist.find(el => el.code == id)

    // HANDLE IMAGE LOADING ERRORS
    const [isImageLoading, setIsImageLoading] = React.useState(true);

    // GET THE CORRECT PRICE OR LOGIN MESSAGE FOR THE BUTTON
    const specialNetPrice = userData?.specialprices[product?.code]
    const standardPrice = Number(product?.price2023)
    const discountMultiplier = userData?.user.discount || 1
    const priceToDisplay = specialNetPrice || (standardPrice * discountMultiplier).toFixed(2)

    const specialPrice = isLoggedIn ? "€" + priceToDisplay : "Login"
    const listPrice = isLoggedIn ? "€" + Number(product?.price2023).toFixed(2) : "Login"
    const discount = (standardPrice - priceToDisplay) / standardPrice * 100


    // IMAGE LOADE HANDLER FOR SPINNER
    const handleImageLoad = () => {
        setIsImageLoading(false);
    };

    return (
        <div className="article-page-outter">

            {/* NAVIGATION LINKS */}
            <div className="back-buttons-container"><Link
                    to=".."
                    relative="path"
                    className="back-button"
                >
                    <img src={leftArrow} alt="go to tools link"/>
                    <span>Go to all tools</span>
                </Link>
                <Link
                    to="../../cart"
                    relative="path"
                    className="back-button red"
                    ><span>Go to cart</span> 
                    <img src={rightArrow} alt="go to cart link"/>
                </Link>
            </div>
            
            <div className="article-page-wrapper">
                <div className="article-page-main">

                    {/* PRODUCT CODE */}
                    <div className="product-card-details-code"><p>art.{product.code}</p></div>

                    {/* CONTENT */}
                    <div className="article-page-main-picture-and-icons">

                        {/* PRODUCT PICTURE */}
                        <div className="article-page-main-img">
                            {/* RENDER SPINNER IF IMAGE IS NOT LOADED */}
                            {isImageLoading && <div className="image-loader-bg"><ScaleLoader color="#CC092F" /></div>}
                            <img
                                loading="lazy"
                                src={product.pictureBig}
                                onLoad={handleImageLoad}
                                alt={`${product.code} image full-size`}
                            />
                            <div className="article-label">
                                <p>{product.quality}</p>
                            </div>
                        </div>
                        {/* PRODUCT ICONS */}
                        <div className="product-card-details-icons-wrapper">
                            <div className="icons-primary">
                                <Icon i={product.technology} />
                                <Icon i={product.notch} />
                                <Icon i={product.type} />
                            </div>
                            <div className="icons-secondary">

                                <div className="horizontal"><Icon i={product.machine.toLowerCase()} /></div>
                                <div className="horizontal"><Icon i={product.power} /></div>
                            </div>

                        </div>
                    </div>

                    {/* PRODUCT DESCRIPTION AND MAIN INFO */}
                    <div className="article-page-main-text">
                        <h2 className="product-card-heading">{product.description}</h2>
                        <p className="product-card-technical-detail" style={{ textDecoration: "underline", letterSpacing: "0.5px", textAlign: "center" }}>{product.material.toUpperCase()}</p>

                        <ProductDots
                            life={product.life}
                            finish={product.finish}
                            speed={product.speed}
                        />

                        {/* SHOW PRICE ONLY IF LOGGED IN */}
                        {isLoggedIn && 
                            
                            <div className="product-card-list-prices">
                                <p>
                                    <span className="product-card-list-price">{listPrice}</span> 
                                    list price 
                                </p>
                                <p className="red">
                                    <span className="product-card-special-price">{specialPrice}</span> 
                                    special price 
                                </p>
                            </div>
                        }

                        <div className="product-card-technical-details">
                            <p className="product-card-technical-detail"><b>Alternative use</b>: {product.material.toLowerCase()} </p>
                            {product.diameter && <p className="product-card-technical-detail"><b>Diameter: </b> {product.diameter} mm </p>}
                            {(product.height != 0) && <p className="product-card-technical-detail"><b>Height: </b> {product.b > 0 ? `${product.height}/${product.b}` : product.height} mm </p>}
                            {(product.thick != 0) && <p className="product-card-technical-detail"><b>Width: </b> {product.thick} mm </p>}
                            {(product.segments != 0) && <p className="product-card-technical-detail"><b>Segments: </b> {product.segments} </p>}
                            {(product.hole != 0) && <p className="product-card-technical-detail"><b>Hole: </b> {product.hole} mm </p>}
                        </div>

                        <div className="product-card-add-button">
                            <CustomButton
                                className="product-card-button-primary"
                                purpose="primary"
                                size="big"
                                productCode={product.code}
                            >
                               ADD TO CART
                            </CustomButton>
                        </div>
                        

                    </div>
                </div>
            </div>

            <div className="article-page-wrapper">
                <div className="article-page-secondary">
                        <h3>Tool Description</h3>
                        <p className="article-page-product-description">{product.characteristics}</p>

                </div>
            </div>

            <div className="article-page-wrapper">
                <div className="article-page-secondary">
                        <h3>Files</h3>
                        <div className="files">
                            <p className="article-page-product-files"><img style={{height: "1.5rem", margin: "0 0.5rem"}} src={file} alt="Catalogue" />
                            <a href={product.catalogue} target="_blank" aria-label="tech-file"><b>Tech File</b></a>
                            </p>
                            <p className="article-page-product-files"><img style={{height: "1.5rem", margin: "0 0.5rem"}} src={file} alt="Catalogue" />
                            <a href={product.catalogue} target="_blank" aria-label="catalogue"><b>Catalogue</b></a>
                            </p>
                        </div>

                </div>
            </div>

            <div className="article-page-wrapper">
                <div className="article-page-secondary">
                        <h3>Discount</h3>
                        <p className="article-page-special-price"><b>Special Discount:</b> {isLoggedIn ? `${discount.toFixed(0)}% applied` : "Login required"}</p>
                </div>
            </div>

        </div>
    )

}