import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./components/layout-components/Layout"
import Home from "./pages/home/Home"
import Tools from "./pages/tools/Tools"
import Cart from './pages/cart/Cart'
import AI from './components/assistant/AI'
import Promos from "./pages/promos/Promos"
import Login from "./pages/login/Login"
import AuthRequired from './components/authentication/AuthRequired'
import ProductDetails from './pages/tools/products/ProductDetails'
import PromosRecommended from "./pages/promos/PromosRecommended"
import PromosGeneral from "./pages/promos/PromosGeneral"
import NotFound from './pages/not-found/NotFound'

import firebaseConfig from './components/authentication/config'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from "firebase/database"

const PricelistContext = React.createContext()
const LoadingContext = React.createContext()
const CartContext = React.createContext()
const APIContext = React.createContext()

// START OF FIREBASE CONFIGURATION // 

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const onlinePriceListDb = ref(database, "pricelist")
const apiKeyDb = ref(database, "api")
const ordersDb = ref(database, "orders")

// PUSH DATA TO FIRESTORE FUNCTION
const sendOrderToDatabase = function(update){
  push(ordersDb, update)
}

// END OF FIREBASE CONFIGURATION // 

export default function App() {

  const [pricelist, setPricelist] = React.useState([])
  const [loading, setLoading] = React.useState()
  const [cart, setCart] = React.useState(
    JSON.parse(window.localStorage.getItem('localCart')) || {}
  )
  const [apiKey, setApiKey] = React.useState('')

  // IMPORT DATA FROM FIREBASE ON FIRST RENDER
  React.useEffect(() => {
    setLoading(true)
    onValue(onlinePriceListDb, function (snapshot) {
      const priceListArray = Object.values(snapshot.val())
      setPricelist(priceListArray)
    })
    onValue(apiKeyDb, function (snapshot) {
      const key = Object.values(snapshot.val())[0]
      setApiKey(key)
    })
    setLoading(false)
  }, [])


  if (loading) return
  return (
    <LoadingContext.Provider value={loading}>
      <PricelistContext.Provider value={pricelist}>
        <CartContext.Provider value={[cart, setCart]}>
          <APIContext.Provider value={[apiKey]}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route element={<AuthRequired />}>
                    <Route index element={<Home />} />
                    <Route path="tools" element={<Tools />} />
                    <Route path="ai" element={<AI />} />
                    <Route path="tools/:id" element={<ProductDetails />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="promos" element={<Promos />}>
                      <Route index element={<PromosGeneral />} />
                      <Route path="recommended" element={<PromosRecommended />} />
                    </Route>
                  </Route>
                  <Route path="login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </APIContext.Provider>
         </CartContext.Provider>
      </PricelistContext.Provider>
    </LoadingContext.Provider>
  )
}

export { PricelistContext, LoadingContext, CartContext, APIContext, sendOrderToDatabase }

