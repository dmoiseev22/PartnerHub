// import { limitToLast } from 'firebase/database'
import React from 'react'
import Product from './Product'
import DiameterFilter from '../../components/filters/DiameterFilter'


export default function Products({ filteredData, isLoggedIn }){

    const [filteredDataByDiameter, setFilteredDataByDiameter] = React.useState(null)

    React.useEffect(()=>{
        setFilteredDataByDiameter(null)
    }, [filteredData])


    function generateUniqueFilteredArray(dataArray, targetKey) {
        let filteredArray = dataArray.map((element) => {
            return element[targetKey];
        });
        const filterArr = removeDuplicatesFromArray(filteredArray);
        return filterArr
    }

    function removeDuplicatesFromArray(array) {
        let uniqueElements = {};
        
        array.forEach((element) => {
            uniqueElements = {
                ...uniqueElements,
                [element]: element
            };
        });
        return Object.values(uniqueElements);
    }

    let uniqueFilteredArr = React.useCallback(
        generateUniqueFilteredArray(filteredData, "diameter"), [filteredData]
    )


    function handleFilterChange(name, value){

        setFilteredDataByDiameter((prevData) => {
            if (value === null) {
                return filteredData
            } else {
                return filteredData.filter(product => product.diameter === value)
            }
            
        })
    }

    const productsToRender = filteredDataByDiameter ? filteredDataByDiameter : filteredData
    const productsToRenderSortedByPrice = productsToRender.sort((product1, product2) => product1.price2023 - product2.price2023)

    console.log(productsToRender)

    return (
        <div className='product-list container'>
            {/* <h3>Search results</h3> */}
            <div className='product-list-items'>
                
                {/* DIAMETER FILTER */} 

                <DiameterFilter 
                    diameterArr={uniqueFilteredArr}
                    handleFilterChange={handleFilterChange}
                />

                {/* FILTERED RESULTS */}
                {productsToRenderSortedByPrice.map((product) => {
                    return <Product 
                            key={product.code + "product-card"}
                            product={product}
                            isLoggedIn={isLoggedIn}
                            />
                })}
            </div>
        </div>
    )
}