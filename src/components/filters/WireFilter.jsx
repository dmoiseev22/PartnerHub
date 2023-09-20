import React from 'react'
import clearFilterImg from '../../../src/assets/clear.png'
import { getFilterClass, capitalizeFirstLetter } from "../../util/util.js"


export default function WireFilter({ handleFilterChange, machineFilterParam, materialFilterParam }) {

    // function getFilterClass(filter){
    //     console.log(filter)
    //     const filterClass = filter.split(' ').join('-')
    //     console.log(filterClass)
    // }

    // function capitalizeFirstLetter(phrase){
    //     const arr = phrase.split(' ')
    //     const capitalizedFirstLetterArray = arr.map((word) => {
    //         return word[0].toUpperCase() + word.slice(1)
    //     })
    //     const newPhrase = capitalizedFirstLetterArray.join(' ')
    //     return newPhrase
    // }

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
                            <img src={clearFilterImg} />
                        </button>
                    ) : null}

                </div>

                {/* SECOND ROW OF FILTER BUTTONS */}
                <div className="tools-list-filter-buttons-materials">

                    <h3>Material</h3>

                    {
                    materialFilterButtons.map(filter => {
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
                            <img src={clearFilterImg} />
                        </button>
                    ) : null}

                </div>
        </>
    )
}