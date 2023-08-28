import React from 'react'
import clearFilterImg from '../../../src/assets/clear.png'

export default function FamilyFilter({ handleFilterChange, familyFilter }) {

    return (
        <div className="tools-list-filter-buttons-family">

            <h3>Search by product family</h3>
            
            <button
                onClick={() => {
                    handleFilterChange("family", "blades")}
                }

                className={
                    `tools-family blades 
                    ${familyFilter === "blades" ? "selected" : ""}`
                }
            > Blades</button>

            <button
                onClick={() => 
                    handleFilterChange("family", "drills")}
                className={
                    `tools-family wire 
                    ${familyFilter === "drills" ? "selected" : ""}`
                }
            >Drill bits</button>

            <button
                onClick={() => {
                    handleFilterChange("family", "wire")}
                }

                className={
                    `tools-family wire 
                    ${familyFilter === "wire" ? "selected" : ""}`
                }
            >Diamond Wire</button>

            {familyFilter ? (
                    <button
                        onClick={() => 
                            handleFilterChange("family", null)}
                        className="tools-family clear-filters"
                    >Clear filters</button>
                ) : null}   

        </div>
    )
}