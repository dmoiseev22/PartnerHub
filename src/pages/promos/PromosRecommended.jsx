import React from 'react'
import Product from '../products/Product'
import { PricelistContext } from "../../App"



export default function PromosRecommended() {

    const [productsToDisplay, setProductsToDisplay] = React.useState([])
    const pricelist = React.useContext(PricelistContext)
    const isLoggedIn = localStorage.getItem("loggedin")

    React.useEffect(()=>{
        const userData = JSON.parse(window.localStorage.getItem("partners-app-local-storage"))
        const codesRecommended = Object.keys(userData?.recommended)
        codesRecommended.forEach((codeRecommended => {
            const productToDisplay = pricelist.find((product) => product.code === codeRecommended)
            if (productToDisplay !== undefined) {
                setProductsToDisplay((prev)=>{
                    return [
                        ...prev,
                        productToDisplay
                    ]
                })
            } 
        }))
    }, [])

    return productsToDisplay.map((product => {
        return <Product 
                    key={product.code}
                    product={product}
                    isLoggedIn={isLoggedIn}
                    />
    }))
}