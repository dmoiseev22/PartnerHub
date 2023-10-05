import React from "react";
import { Link, useLocation } from 'react-router-dom'
import trash from '../../assets/fa-icons/x-solid.svg'
import Badge from "../../components/badge/Badge";


export default function ProductInCart({ quantity, product, userData, order, updateQuantity, removeItem, setCartTotal }) {


    const [inputQuantityValue, setInputQuantityValue] = React.useState(quantity)
    const [itemTotalValue, setItemTotalValue] = React.useState(0)
    
    const location = useLocation()

    if (!product) return
    if (!userData) return

    const { code, description, price2023 } = product
    const { specialprices, user } = userData

    // GET PRICES

    const listPrice = Number(price2023)
    const finalPrice = specialprices[code] || listPrice * user.discount || price2023
    const total = finalPrice * inputQuantityValue
    
    // UPDATE ITEM TOTAL AND CART TOTAL IF USER CHANGES INPUT QUANTITIES
    React.useEffect(() => {
        setItemTotalValue(total)
        console.log('component rerendered')
        setCartTotal((prev) => {
            return {
                ...prev,
                [code]: total
            }
        })
    }, [inputQuantityValue])

    console.log("itemTotalValue: ", itemTotalValue)

    function handleChange(event) {
        setInputQuantityValue(event.target.value)
        console.log(code, event.target.value)
        updateQuantity(code, event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
    }


    return (
        <div className="product-in-cart-wrapper">
            <Badge 
                productCode={product.code}
                userData={userData}
                position="absolute"
                left="-1px"
            />
            <Link
                to={`/tools/${product.code}`}
                state={{
                    message: "Cart",
                    from: location.pathname
                }} >
                <p
                    className="cart-product-code"
                    style={{ textDecoration: "underline" }}>
                    {code}
                </p>
            </Link>
            <p className="cart-product-description">{description}</p>
            <p className="cart-product-listprice">{listPrice.toFixed(2)}</p>
            <p className="cart-product-finalprice">{finalPrice.toFixed(2)}</p>
            <form onSubmit={handleSubmit} className="cart-product-input-form">
                {/* <label type="text" htmlFor={code}></label> */}
                <input
                    name={code}
                    type="number"
                    className="cart-product-input"
                    value={inputQuantityValue}
                    onChange={handleChange}
                />
            </form>
            {/* <p className="cart-product-quantity">{quantity}</p> */}
            <p className="cart-product-total">{total.toFixed(2)}</p>
            <div
                id={code}
                className="cart-product-remove"
                onClick={(e) => removeItem(e.target.id)}
            ><img id={code} src={trash} />
            </div>
        </div>
    )
}