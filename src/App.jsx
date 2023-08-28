import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Layout from "./components/Layout"
import Home from "./pages/Home"
import Tools from "./pages/Tools"
import Promos from "./pages/Promos"
import Feedback from "./pages/Feedback"

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from "firebase/database"

const PricelistContext = React.createContext()

export default function App() {

  // database import from firebase
  const [pricelist, setPricelist] = React.useState([])

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

  React.useEffect(() => {
    onValue(onlinePriceListDb, function (snapshot) {
      let priceListArray = Object.values(snapshot.val())
      setPricelist(priceListArray)
      console.log(priceListArray)
    })
  }, [])

  return (
    <PricelistContext.Provider value={pricelist}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tools" element={<Tools />} />
            <Route path="promos" element={<Promos />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PricelistContext.Provider>
  )
}

export { PricelistContext }

