import React from "react";
import Product from "./Product";
import { useParams, Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { LoadingContext, PricelistContext } from "../../App"
import heart from "../../assets/heart.svg"
import blank from "../../assets/blades/blank.png"
import ProductEmojis from "./ProductDots";
import CustomButton from "../../components/buttons/CustomButton";
import Icon from "../../components/icons/Icon";
import file from "../../assets/file-regular.svg"


export default function ProductDetails() {
    const pricelist = React.useContext(PricelistContext)
    const loading = React.useContext(LoadingContext)
    const userData = JSON.parse(window.localStorage.getItem("partners-app-local-storage"))
    const isLoggedIn = localStorage.getItem("loggedin")
    const { id } = useParams()
    const location = useLocation()

    console.log(location)

    if (pricelist.length < 1) return <h3>Loading...</h3>

    const product = pricelist.find(el => el.code == id)

    console.log(product)

    const cardColor = {
        backgroundColor:
            product.series === "Red" ? "red"
                : product.series === "Porcelanic" ? "red"
                    : product.series === "Orange" ? "orange"
                        : product.series === "Blue" ? "blue"
                            : product.series === "Green" ? "green"
                                : product.series === "Black" ? "#313131"
                                    : "#919191"
    }


    // GET THE CORRECT PRICE OR LOGIN MESSAGE FOR THE BUTTON
    const specialNetPrice = userData?.specialprices[product?.code]
    const standardPrice = Number(product?.price2023)
    const discountMultiplier = userData?.user.discount || 1
    const priceToDisplay = specialNetPrice || (standardPrice * discountMultiplier).toFixed(2)
    const discount = (standardPrice - priceToDisplay) / standardPrice * 100
    console.log('discount: ', discount)
    const buttonText = isLoggedIn ? "€" + priceToDisplay : "Login"

    console.log('PICTURE', product.pictureSmall)

    return (
        <div className="article-page-outter">

            {/* <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all tools</span>
            </Link>
            <br />
            <Link
                to="../../cart"
                relative="path"
                className="back-button"
            >&larr; <span>Back to cart</span>
            </Link> */}

            <div className="article-page-wrapper">
                <div className="article-page-main">

                    {/* PRODUCT CODE */}
                    <div className="product-card-details-code"><p>art.{product.code}</p></div>

                    {/* LINKS BACK */}
                    <div className="back-buttons-container"><Link
                            to=".."
                            relative="path"
                            className="back-button"
                        >&larr; <span>Back to all tools</span>
                        </Link>
                        <br />
                        <Link
                            to="../../cart"
                            relative="path"
                            className="back-button"
                        >&larr; <span>Back to cart</span>
                        </Link>
                    </div>

                    {/* CONTENT */}
                    <div className="article-page-main-picture-and-icons">

            
                        {/* PRODUCT PICTURE */}
                        <div className="article-page-main-img">
                            <img
                                loading="lazy"
                                src={product.pictureBig || blank}
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

                        <ProductEmojis
                            life={product.life}
                            finish={product.finish}
                            speed={product.speed}
                        />

                        <div className="product-card-technical-details">
                            <p className="product-card-technical-detail"><b>Alternative use</b>: {product.material.toLowerCase()} </p>
                            <p className="product-card-technical-detail"><b>Diameter: </b> {product.diameter} mm </p>
                            <p className="product-card-technical-detail"><b>Height: </b> {product.b > 0 ? `${product.height}/${product.b}` : product.height} mm </p>
                            <p className="product-card-technical-detail"><b>Width: </b> {product.thick} mm </p>
                            <p className="product-card-technical-detail"><b>Segments: </b> {product.segments} mm </p>
                            <p className="product-card-technical-detail"><b>Hole: </b> {product.hole} mm </p>
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
                            <p className="article-page-product-description"><img style={{height: "1.5rem", margin: "0 0.5rem"}} src={file} alt="Catalogue" />
                            <a href={product.catalogue} target="_blank"><b>Tech File</b></a>
                            </p>
                            <p className="article-page-product-description"><img style={{height: "1.5rem", margin: "0 0.5rem"}} src={file} alt="Catalogue" />
                            <a href={product.catalogue} target="_blank"><b>Catalogue</b></a>
                            </p>
                        </div>

                </div>
            </div>

            <div className="article-page-wrapper">
                <div className="article-page-secondary">
                        <h3>Price</h3>
                        <p className="article-page-list-price"><b>List Price: </b>{isLoggedIn ? "€" + Number(product?.price2023).toFixed(2): "Login"}</p>
                        <br />
                        <p className="article-page-special-price"><b>Special Price: </b>{buttonText}</p>
                        <br />
                        <p className="article-page-special-price"><b>Special Discount :</b> {isLoggedIn ? `${discount.toFixed(0)} %` : buttonText}</p>


                </div>
            </div>

            <div className="article-page-wrapper">
                <div className="article-page-button">
                    <CustomButton
                        className="product-card-button-primary"
                        purpose="primary"
                        size="big"
                        productCode={product.code}
                    >
                        Add to Cart: {buttonText}
                    </CustomButton>
                </div>
            </div>



        </div>
    )

}