// import { limitToLast } from 'firebase/database'
import React from 'react'
import Product from './Product'

export default function Products({ filteredData }){

    console.log(filteredData)
    
    return (
        <div className='product-list container'>
            {/* <h3>Search results</h3> */}
            <div className='product-list-items'>
                {filteredData.map((product) => {
                    return <Product product={product}/>
                })}
            </div>
        </div>
    )
}