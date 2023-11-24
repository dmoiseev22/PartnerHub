import React from "react"
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from "firebase/database" 
import firebaseConfig from "../components/authentication/config";

// NEED TO ADD USE MEMO TO AVOIDE UNNECESSARY RE-RENDER
export default function updateDbFn(collection, update){

    // AVOID DB MUTATION
    if (collection === "pricelist") {return <p>Database is read-only</p>}

    let data 

    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app)
    const onlinePriceListDb = ref(database, collection)
    
    React.useEffect(()=>{
        push(onlinePriceListDb, update)
    }, [])
    
    return <p>{`Data update request send to ${collection} database`}</p>
}
