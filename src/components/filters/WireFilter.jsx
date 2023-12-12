import React from 'react'
import { getFilterClass, capitalizeFirstLetter } from "../../util/util.jsx"


export default function WireFilter({ handleFilterChange, machineFilterParam, materialFilterParam }) {

    const machineFilterButtons = [
        "low power", 
        "medium power", 
        "high power"
    ]

    const materialFilterButtons = [
        "reinforced concrete", 
        "concrete", 
        "steel",
        "masonry"
    ]

    return (
        <>
            <div className="tools-list-filter-buttons-machines">
                {/* FIRST ROW OF FILTER BUTTONS */}
                <h3>Machine</h3>
                {
                    machineFilterButtons.map(filter => {
                      return (
                        <button
                            key={filter}
                            onClick={() => handleFilterChange("machine", filter)}
                            className={
                                `tools-machine 
                                ${getFilterClass(filter)}
                                ${machineFilterParam === filter ? "selected" : ""}`
                            }
                            >{capitalizeFirstLetter(filter)}
                        </button>
                      )
                    })
                }
                
                {/* CLEAR MACHINE FILTER */}
                    {machineFilterParam ? (
                        <button
                            onClick={() => handleFilterChange("machine", null)}
                            className="tools-machine clear-filters"
                        >
                            Clear filter
                        </button>
                    ) : null}

                </div>

                {/* SECOND ROW OF FILTER BUTTONS */}
                <div className="tools-list-filter-buttons-materials">

                    <h3>Material</h3>

                    {materialFilterButtons.map(filter => {
                        return (
                            <button
                                key={filter}
                                onClick={() => handleFilterChange("material", filter)}
                                className={
                                    `tools-material 
                                    ${getFilterClass(filter)}
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
                        >
                            Clear filter
                        </button>
                    ) : null}

                </div>
        </>
    )
}