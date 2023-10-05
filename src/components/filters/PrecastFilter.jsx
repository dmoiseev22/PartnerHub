import React from 'react'
import { getFilterClass, capitalizeFirstLetter } from "../../util/util.js"

export default function PrecastFilter({ handleFilterChange, machineFilterParam, materialFilterParam }) {

    const machineFilterButtons = [
        "precast machine", 
    ]

    const materialFilterButtons = [
        "0% sand", 
        "5% sand",
        "20% sand",
        "40% sand",
    ]


    return (
        <>
            <div className="tools-list-filter-buttons-machines">

                <h3>Machine</h3>

                {/* FIRST ROW OF FILTER BUTTONS */}
                {machineFilterButtons.map(filter => {
                        const filterClass = getFilterClass(filter)
                        const filterName = capitalizeFirstLetter(filter)
                        console.log('filter', filter)
                        return (
                            <button
                                key={filter}
                                onClick={() => handleFilterChange("machine", filter)}
                                className={
                                    `tools-machine 
                                    ${filterClass}
                                    ${machineFilterParam === filter ? "selected" : ""}`
                                }
                                >{filterName}
                            </button>
                        )
                    })
                }

                {/* CLEAR MACHINE FILTER */}
                {machineFilterParam ? (
                    <button
                        onClick={() => handleFilterChange("machine", null)}
                        className="tools-machine clear-filters"
                    >   Clear filter
                        {/* <img src={clearFilterImg} /> */}
                    </button>
                ) : null}

            </div>

            {/* SECOND ROW OF FILTER BUTTONS */}
            <div className="tools-list-filter-buttons-materials">

                <h3>Material</h3>
                
                {materialFilterButtons.map(filter => {
                        const filterClass = getFilterClass(filter)
                        return (
                            <button
                                key={filter}
                                onClick={() => handleFilterChange("material", filter)}
                                className={
                                    `tools-material 
                                    ${filterClass}
                                    ${materialFilterParam === filter ? "selected" : ""}`
                                }
                                >{capitalizeFirstLetter(filter)}
                            </button>
                        )
                    })
                }
                {/* CLEAR MATERIAL FILTER */}
                {materialFilterParam ? (
                    <button
                        onClick={() => handleFilterChange("material", null)}
                        className="tools-material clear-filters"
                    >   Clear filter
                        {/* <img src={clearFilterImg} /> */}
                    </button>
                ) : null}

            </div>
        </>
    )
}