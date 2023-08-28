import React from "react"
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from "firebase/database" 

// NEED TO ADD USE MEMO TO AVOIDE UNNECESSARY RE-RENDER
export default function updateDbFn(collection, update){

    console.log("module launched")

    // AVOID DB MUTATION
    if (collection === "pricelist") {return <p>Database is read-only</p>}

    let data 

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
    const onlinePriceListDb = ref(database, collection)
    
    React.useEffect(()=>{
        push(onlinePriceListDb, update)
    }, [])

    console.log("module finished")
    
    return <p>{`Data update request send to ${collection} database`}</p>
}
