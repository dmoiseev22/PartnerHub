import React from "react";
import { Link } from "react-router-dom"
import { getDatabase, ref, push, onValue } from "firebase/database" 
import { PricelistContext } from "../../App";
import ProductInCart from "./ProductInCart";
import ProductsInCartHeading from "./ProductsInCartHeading";
import CartFastOrder from "./CartFastOrder";
import EmptyCart from "./EmptyCart";
import { CartContext, sendOrderToDatabase } from "../../App";
import trash from '../../assets/fa-icons/x-solid.svg'
import { saveToLocalStorageCart, getDataFromLocalStorage } from "../../util/util";
import Notice from "../../components/modal/Notice";

export default function Cart() {

    const pricelist = React.useContext(PricelistContext)
    const [cart, setCart] = React.useContext(CartContext)
    const [cartTotal, setCartTotal] = React.useState({})
    const [showSentNotice, setShowSentNotice] = React.useState(false)

    const [newItemInputValue, setNewItemInputValue] = React.useState()
        
    const userData = getDataFromLocalStorage("partners-app-local-storage")
    const isLoggedIn = getDataFromLocalStorage("loggedin")
    
    
    if (!pricelist) return
    if (!cart) return
    if (pricelist.length < 1) return <h3>Loading 1...</h3>

    function updateQuantity(code, quantity) {
        const updatedCart = {
            ...cart,
            [code]: quantity
        }
        saveToLocalStorageCart(updatedCart)
        setCart(updatedCart)
    }

    function removeItem(productCode) {
        const updatedCart = {...cart}
        delete updatedCart[productCode]
        saveToLocalStorageCart(updatedCart)
        setCart(updatedCart)
        setCartTotal((prev) => {
            return {
                ...prev,
                [productCode]: 0
            }
        })
    }

    function addUsualProducts(){
        console.log('addUsualProducts function triggered! ')
        const updatedCart = {
            ...cart,
            ...userData.usualproducts
        }
        saveToLocalStorageCart(updatedCart)
        setCart(updatedCart)
    }

    function addRecommendedProducts(){
        const updatedCart = {
            ...cart,
            ...userData.recommended
        }
        saveToLocalStorageCart(updatedCart)
        setCart(updatedCart)
    }

    function clearCart(){
        const updatedCart = {}
        saveToLocalStorageCart(updatedCart)
        setCart(updatedCart)
    }
    
    function handleSubmit(e) {
        e.preventDefault()

        if (!pricelist.find((el) => el.code === newItemInputValue)) return 

        const updatedCart = {
            ...cart,
            [newItemInputValue]: 0
        }

        saveToLocalStorageCart(updatedCart)
        setCart(updatedCart)
        setNewItemInputValue('')
    }

    function closeModal() {
        setShowSentNotice(false)
        clearCart()
    }
    

    const uniqueCartAtticlesList = Object.keys(cart)
    const productsInCart = 
            uniqueCartAtticlesList.map((articleNumber) => {
                const productToDisplay = pricelist.find(product => product.code == articleNumber)
                const productCode = productToDisplay?.code
                const quantity = cart[productCode] || 0
                return (                
                    <ProductInCart
                        key={articleNumber}
                        quantity={quantity}
                        product={productToDisplay}
                        order={cart[productCode]}
                        isLoggedIn={isLoggedIn}
                        userData={userData}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                        setCartTotal={setCartTotal}
                        // isRecommended={isRecommended}
                    />
                )
            })

    const cartTotalToDisplay = (Object.keys(cartTotal).length !== 0) 
        ? Object.values(cartTotal).reduce((total, num) => total + num, 0)
        : 0;

    return (
        <div className="cart-wrapper">
            <div className="cart-wrapper-inner">
                {(uniqueCartAtticlesList.length < 1) ? <EmptyCart addUsualProducts={addUsualProducts}/>
                
                    : (<div className="cart-wrapper-with-products">
                        
                        <h2>Your list</h2>

                        {/* FAST ORDER SECTION */}
                        <CartFastOrder 
                            addUsualProducts={addUsualProducts}
                            addRecommendedProducts={addRecommendedProducts}
                        />

                        {/* HEADING FOR PRODUCTS IN THE CART */}
                        <ProductsInCartHeading 
                            clearCart={clearCart}    
                            trash={trash}
                        />

                        {/* ITEMS IN THE CART */}
                        {productsInCart}

                        {/* ADD NEW PRODUCT INPUT */}
                        <form autoComplete="off" onSubmit={handleSubmit} className="cart-new-item-input-form">
                            <label htmlFor="search"></label>
                            <input 
                                className="cart-new-item-input"
                                value={newItemInputValue}
                                name="search"
                                type="text" 
                                placeholder=" + code"
                                onChange={(e) => setNewItemInputValue(e.target.value)}
                                // autoFocus
                            />
                            <button onClick="submit">Add</button>
                        </form>

                        <h4 className="cart-order-total">Total: €{cartTotalToDisplay.toFixed(2)} </h4>
                        
                        <div>
                           <br />
                            <Link to="../../tools">
                                <button
                                    className="explore-button"
                                    aria-label="explore tools button" >
                                    EXPLORE MORE
                                </button>
                            </Link>

                            <button
                                aria-label="send order button"
                                onClick={()=>{
                                    const dateObject = new Date().toLocaleString()
                                    const time = dateObject.toLocaleString(dateObject)
                                    sendOrderToDatabase({
                                        "user": userData.user.id,
                                        "order": cart,
                                        "time": time
                                    })
                                    setShowSentNotice(true)
                                }}
                                className="send-button" >
                                    SEND
                            </button>

                            {showSentNotice ? <Notice closeModal={closeModal}/> : null }
                        </div>

                     </div>
                    )
                }
            </div>
        </div>
        
    )
}