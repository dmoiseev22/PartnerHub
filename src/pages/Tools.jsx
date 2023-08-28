import React from "react"
import Products from './products/Products'
import { Link, useSearchParams } from "react-router-dom"
import { PricelistContext } from "../App"
import DiscsFilters from "../components/filters/DiscsFilter"
import FamilyFilter from "../components/filters/FamilyFilter"
import DrillsFilter from "../components/filters/DrillsFilter"
import WireFilter from "../components/filters/WireFilter"
import Search from  "../components/search/Search"



export default function Tools() {
    const pricelist = React.useContext(PricelistContext)
    // const [productFamilyFilter, setProductFamilyFilter] = React.useState("")
    const [searchInput, setSearchInput] = React.useState("")
    const [filteredData, setFilteredData] = React.useState([])

    const [searchParams, setSearchParams] = useSearchParams()

    const familyFilter = searchParams.get("family")
    const machineFilter = searchParams.get("machine")
    const materialFilter = searchParams.get("material")
    


    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    function convertStringToLowercasedArray(str){
        const arr = str.toLowerCase().split(', ')
        return arr
    }
    


    // const displayedProducts = searchInput ? filteredData
    //         : (machineFilter && materialFilter)
    //         ? pricelist.filter(product => {
    //             return (
    //                 convertStringToLowercasedArray(product.machine).includes(machineFilter) &&
    //                 convertStringToLowercasedArray(product.material).includes(materialFilter)
    //             )
    //         })
    //         : (machineFilter && !materialFilter) 
    //         ? pricelist.filter(product => {
    //                 console.log('mchine filter used')
    //                 return convertStringToLowercasedArray(product.machine).includes(machineFilter)
    //         })
    //         : (!machineFilter && materialFilter) 
    //         ? pricelist.filter(product => {
    //                 return convertStringToLowercasedArray(product.material).includes(materialFilter)
    //         })
    //         : pricelist


    // START OF FILTERING LOGIC//
    let displayedProducts;

    // IF SEACHED BY CODE, OTHER FILTERS DON'T APPLY
    if (searchInput) {
        displayedProducts = filteredData;
    // IF FAMILY, MACHINE AND MATERIAL ARE CHOSEN, ALL 3 CRITERIA SHOULD MEET
    } else if (familyFilter && machineFilter && materialFilter) {
        displayedProducts = pricelist.filter(product =>
            isFamilyMatching(product, familyFilter) &&
            isMachineMatching(product, machineFilter) && 
            isMaterialMatching(product, materialFilter)
        );
    // IF FAMILY IS CHOSEN BUT ONLY ONE FILTER APPLIED
    } else if (familyFilter && (machineFilter || materialFilter)) {
        displayedProducts = pricelist.filter(product =>
            isFamilyMatching(product, familyFilter) &&
            (isMachineMatching(product, machineFilter) || isMaterialMatching(product, materialFilter))
        );
    // FAMILY ONLY FILTER
    // } else if (familyFilter) {
    } else if (familyFilter) {
        displayedProducts = pricelist.filter(product => isFamilyMatching(product, familyFilter))
    } else {
        displayedProducts = pricelist
    }
    // } else if (machineFilter && materialFilter) {
    //     displayedProducts = pricelist.filter(product =>
    //         isMachineMatching(product, machineFilter) &&
    //         isMaterialMatching(product, materialFilter)
    //     );
    // } else if (machineFilter && !materialFilter) {
    //     displayedProducts = pricelist.filter(product => isMachineMatching(product, machineFilter));
    // } else if (!machineFilter && materialFilter) {
    //     displayedProducts = pricelist.filter(product => isMaterialMatching(product, materialFilter));
    // } else {
    //     displayedProducts = pricelist;
    // }

    function isFamilyMatching(product, filterValue) {
        return convertStringToLowercasedArray(product.family).includes(filterValue);
    }

    function isMachineMatching(product, filterValue) {
        return convertStringToLowercasedArray(product.machine).includes(filterValue);
    }

    function isMaterialMatching(product, filterValue) {
        return convertStringToLowercasedArray(product.material).includes(filterValue);
    }

    // END OF FILTERING LOGIC//

    function handleSubmit(event){
        event.preventDefault()
        setSearchInput("")
    }

    function handleChange(event){
        setSearchInput(event.target.value);
        filterData(event.target.value)
    }
    
    function filterData(input){
        console.log('filterData function starts')
        let filteredResult = pricelist.filter((product) => {
            return product.code.startsWith(input)
        })
        setFilteredData(filteredResult)
        console.log('filterData function ends')
    }


    console.log(filteredData.length)
    // console.log(displayedProducts)

    return (

        <div>

            <div className="tools-list-container">

                <h1>Diamond Tools Finder</h1>

                {/* SEARCH BY ARTICLE FORM */}

                {/* <Search 
                    handleChange={handleChange}
                    searchInput={searchInput}
                    handleSubmit={handleSubmit}
                /> */}

                {/*  FILTERS AND RESULTS */}
                <div className="tools-list-container-layout">

                    {/* PRODUCT FAMILY FILTER */}
                    <div className="search-and-filter-wrapper">
                        <Search 
                            key="search"
                            handleChange={handleChange}
                            searchInput={searchInput}
                            handleSubmit={handleSubmit}
                        />

                        <FamilyFilter 
                            handleFilterChange={handleFilterChange}
                            familyFilter={familyFilter}
                        />
                    </div>

                    <div className="tools-list-filter-and-results">
                        {/* FAMILY SPECIFIC FILTERS RENDERED WHEN FAMILY IS SELECTED*/}
                        <div className="tools-list-filters-wrapper">

                            {familyFilter === "blades" ? 
                                <DiscsFilters 
                                    handleFilterChange={handleFilterChange}
                                    machineFilter={machineFilter}
                                    materialFilter={materialFilter}
                                /> :
                            familyFilter === "drills" ? 
                                <DrillsFilter 
                                    handleFilterChange={handleFilterChange}
                                    machineFilter={machineFilter}
                                    materialFilter={materialFilter}
                                /> :

                            familyFilter === "wire" ? 
                                <WireFilter 
                                    handleFilterChange={handleFilterChange}
                                    machineFilter={machineFilter}
                                    materialFilter={materialFilter}
                                /> : null}
                                
                                
                                
                        </div>

                        {/* RENDERING RESULTS */}
                        <div className="search-results">
                            {displayedProducts.length > 0 
                                ?  <Products filteredData={displayedProducts}/> 
                                : (<p>No matching products found.</p>)}
                        </div>

                    </div>
                    

                </div>





            </div>
            
        </div>
    )
}