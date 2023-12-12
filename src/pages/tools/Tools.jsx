import React from "react"
import Products from './products/Products'
import { Link, useSearchParams } from "react-router-dom"
import { PricelistContext, LoadingContext } from "../../App"
import DiscsFilters from "../../components/filters/DiscsFilter"
import FamilyFilter from "../../components/filters/FamilyFilter"
import DrillsFilter from "../../components/filters/DrillsFilter"
import WireFilter from "../../components/filters/WireFilter"
import SegmentsFilter from "../../components/filters/SegmentsFilter"
import GrindingFilter from "../../components/filters/GrindingFilter"
import PrecastFilter from "../../components/filters/PrecastFilter"
import Search from "../../components/search/Search"

export default function Tools() {

    const pricelist = React.useContext(PricelistContext)
    const loading = React.useContext(LoadingContext)
    const [searchInput, setSearchInput] = React.useState("")
    const [filteredData, setFilteredData] = React.useState([])

    const [searchParams, setSearchParams] = useSearchParams()

    const familyFilterParam = searchParams.get("family")
    const machineFilterParam = searchParams.get("machine")
    const materialFilterParam = searchParams.get("material")

    const isLoggedIn = localStorage.getItem("loggedin")

    console.log(pricelist)
    console.log(pricelist.map(product => {

        return `Diamond ${product.family === "grinding" ? "grinding cup" : product.family === "precast" ? "precast blade" : product.family} with product code ${product.code} and description "${product.description}". ${product.technology === "laser" ? "It is laser welded tool." : ""} It is best used for the following materials: ${product.material}. The tool has diameter of ${product.diameter}mm ${product.hole ? `and shaft hole ${product.hole} mm` : ""} is designed to be used on the following machines: ${product.machine}. Machines' recommended power: ${product.power}. The tool is designed to work in ${product.type === "dry" ? "dry" : "wet"} conditions. It’s a ${product.quality} quality. The width of the tool is: ${product.thick}mm, the height is ${Number(product.height) + Number(product.b)}mm. ${product.b ? `The segment base is ${product.b}.` : null} ${product.segments > 1 ? `It has ${product.segments} segments.` : null} ${product.notch ? `Tool notch type is ${product.notch}` : "" } ${product.notch}. Product belongs to series: ${product.series}  It’s performance characteristics are: speed: ${product.speed} out of 5, life: ${product.life} out of 5, finish: ${product.finish} out of 5. Catalogue link: ${product.catalogue}. Link to product details: ${`https://partner-hub.netlify.app/tools/${product.code}`}`
    }))

    function clearFilters() {
        setSearchParams(prevParams => {
                prevParams.delete("machine")
                prevParams.delete("material")
        })
    }

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

    function convertStringToLowercasedArray(str) {
        const arr = str.toLowerCase().split(', ')
        return arr
    }

    // START OF FILTERING LOGIC//
    const displayedProducts = React.useMemo(() => {
        if (searchInput) {
            return filteredData;
            // IF FAMILY, MACHINE AND MATERIAL ARE CHOSEN, ALL 3 CRITERIA SHOULD MEET
        } else if (familyFilterParam && machineFilterParam && materialFilterParam) {
            return pricelist.filter(product =>
                isFamilyMatching(product, familyFilterParam) &&
                isMachineMatching(product, machineFilterParam) &&
                isMaterialMatching(product, materialFilterParam)
            );
            // IF FAMILY IS CHOSEN BUT ONLY ONE FILTER APPLIED
        } else if (familyFilterParam && (machineFilterParam || materialFilterParam)) {
            return pricelist.filter(product =>
                isFamilyMatching(product, familyFilterParam) &&
                (isMachineMatching(product, machineFilterParam) || isMaterialMatching(product, materialFilterParam))
            );
            // FAMILY ONLY FILTER
        } else if (familyFilterParam) {
            return pricelist.filter(product => isFamilyMatching(product, familyFilterParam));
        } else {
            return pricelist;
        }
    }, [searchInput, familyFilterParam, machineFilterParam, materialFilterParam]);


    function isFamilyMatching(product, filterValue) {
        return convertStringToLowercasedArray(product.family).includes(filterValue);
    }

    function isMachineMatching(product, filterValue) {
        return convertStringToLowercasedArray(product.machine).includes(filterValue);
    }

    function isMaterialMatching(product, filterValue) {
        return convertStringToLowercasedArray(product.material).includes(filterValue);
    }

    // // END OF FILTERING LOGIC//

    function handleSubmit(event) {
        event.preventDefault()
        setSearchInput("")
    }

    function handleChange(event) {
        setSearchInput(event.target.value);
        searchProduct(event.target.value)
    }

    function searchProduct(input) {
        let filteredResult = pricelist.filter((product) => {
            return product.code.startsWith(input)
        })
        setFilteredData(filteredResult)
    }


    // const emptyPlaceHolder = (<div className="products-placeholder"> <img src={loading} alt="" /> </div>)

    return (
        loading ? (
            <h3>Loading</h3>
        ) : (
            <div className="container">
                <div className="tools-list-container">

                    <h1>Diamond Tools Explorer</h1>

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
                                clearFilters={clearFilters}
                                familyFilterParam={familyFilterParam}
                            />
                        </div>

                        <div className="tools-list-filter-and-results">
                            {/* FAMILY SPECIFIC FILTERS RENDERED WHEN FAMILY IS SELECTED*/}
                            <div className="tools-list-filters-wrapper">

                                    {familyFilterParam === "blades" ?
                                    <DiscsFilters
                                        handleFilterChange={handleFilterChange}
                                        machineFilterParam={machineFilterParam}
                                        materialFilterParam={materialFilterParam}
                                    /> :
                                    familyFilterParam === "drills" ?
                                    <DrillsFilter
                                        handleFilterChange={handleFilterChange}
                                        machineFilterParam={machineFilterParam}
                                        materialFilterParam={materialFilterParam}
                                    /> :

                                    familyFilterParam === "wire" ?
                                        <WireFilter
                                            handleFilterChange={handleFilterChange}
                                            machineFilterParam={machineFilterParam}
                                            materialFilterParam={materialFilterParam}
                                        /> : 

                                    familyFilterParam === "grinding" ?
                                        <GrindingFilter
                                            handleFilterChange={handleFilterChange}
                                            machineFilterParam={machineFilterParam}
                                            materialFilterParam={materialFilterParam}
                                        /> : 

                                    familyFilterParam === "precast" ?
                                        <PrecastFilter
                                            handleFilterChange={handleFilterChange}
                                            machineFilterParam={machineFilterParam}
                                            materialFilterParam={materialFilterParam}
                                        /> : 

                                    familyFilterParam === "segments" ?
                                        <SegmentsFilter
                                            handleFilterChange={handleFilterChange}
                                            machineFilterParam={machineFilterParam}
                                            materialFilterParam={materialFilterParam}
                                        /> : null}



                            </div>

                            {/* RENDERING RESULTS */}
                            <div className="search-results">
                                {displayedProducts.length > 0
                                    ? <Products
                                        filteredData={displayedProducts}
                                        isLoggedIn={isLoggedIn}
                                    />
                                    : (<div className="products-placeholder"><p>No matching products found.</p></div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}