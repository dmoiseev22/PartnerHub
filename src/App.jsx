import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"


import Layout from "./components/layout-components/Layout"
import Home from "./pages/home/Home"
import Tools from "./pages/tools/Tools"
import Cart from './pages/cart/Cart'
import Promos from "./pages/promos/Promos"
import Login from "./pages/login/Login"
import AuthRequired from './components/authentication/AuthRequired'
import ProductDetails from './pages/products/ProductDetails'
import PromosRecommended from "./pages/promos/PromosRecommended"
import PromosGeneral from "./pages/promos/PromosGeneral"
import NotFound from './pages/not-found/NotFound'

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from "firebase/database"

const PricelistContext = React.createContext()
const LoadingContext = React.createContext()
const CartContext = React.createContext()

// START OF FIREBASE CONFIGURATION // 
const firebaseConfig = {
  apiKey: "AIzaSyBD_OUECP1sYXgzdk1q83HrrXUVq7o0lls",
  authDomain: "solga-partners-home.firebaseapp.com",
  databaseURL: "https://solga-partners-home-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "solga-partners-home",
  storageBucket: "solga-partners-home.appspot.com",
  messagingSenderId: "1037744607558",
  appId: "1:1037744607558:web:ed96850c9ae6e7b6d3d547"
};

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const onlinePriceListDb = ref(database, "pricelist")
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

  // IMPORT DATA FROM FIREBASE ON FIRST RENDER
  React.useEffect(() => {
    setLoading(true)
    onValue(onlinePriceListDb, function (snapshot) {
      let priceListArray = Object.values(snapshot.val())
      setPricelist(priceListArray)
      // console.log(priceListArray)
    })
    setLoading(false)
  }, [])


  if (loading) return
  return (
    <LoadingContext.Provider value={loading}>
      <PricelistContext.Provider value={pricelist}>
        <CartContext.Provider value={[cart, setCart]}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="tools" element={<Tools />} />
                <Route path="tools/:id" element={<ProductDetails />} />
                <Route element={<AuthRequired />}>
                  <Route path="cart" element={<Cart />} />
                  <Route path="promos" element={<Promos />}>
                    <Route index element={<PromosGeneral />} />
                    <Route path="recommended" element={<PromosRecommended />} />
                  </Route>
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="/*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
         </CartContext.Provider>
      </PricelistContext.Provider>
    </LoadingContext.Provider>
  )
}

export { PricelistContext, LoadingContext, CartContext, sendOrderToDatabase }

