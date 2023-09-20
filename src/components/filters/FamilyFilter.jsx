import React from 'react'

export default function FamilyFilter({ handleFilterChange, familyFilterParam, clearFilters }) {

    console.log("familyFilterParam: ", familyFilterParam)

    return (
        <div className="tools-list-filter-buttons-family">

            <h3>Filter by product family</h3>
            
            <button
                onClick={() => {
                    clearFilters()
                    handleFilterChange("family", "blades")}
                }

                className={
                    `tools-family blades 
                    ${familyFilterParam === "blades" ? "selected" : ""}`
                }
            > Blades</button>

            <button
                onClick={() => {
                    clearFilters()
                    handleFilterChange("family", "segments")}
                }

                className={
                    `tools-family segments 
                    ${familyFilterParam === "segments" ? "selected" : ""}`
                }
            >Segments</button>      

            <button
                onClick={() => {
                    clearFilters()
                    handleFilterChange("family", "drills")}
                }
                className={
                    `tools-family wire 
                    ${familyFilterParam === "drills" ? "selected" : ""}`
                }
            >Drill bits</button>

            <button
                onClick={() => {
                    clearFilters()
                    handleFilterChange("family", "grinding")}
                }

                className={
                    `tools-family grinding 
                    ${familyFilterParam === "grinding" ? "selected" : ""}`
                }
            >Grinding</button>      
            
            <button
                onClick={() => {
                    clearFilters()
                    handleFilterChange("family", "precast")}
                }

                className={
                    `tools-family precast 
                    ${familyFilterParam === "precast" ? "selected" : ""}`
                }
            >Precast</button>      
            
            <button
                onClick={() => {
                    clearFilters()
                    handleFilterChange("family", "wire")}
                }

                className={
                    `tools-family wire 
                    ${familyFilterParam === "wire" ? "selected" : ""}`
                }
            >Diamond Wire</button>


            {familyFilterParam ? (
                    <button
                        onClick={() => 
                            handleFilterChange("family", null)}
                        className="tools-family clear-filters"
                    >Clear all </button>
                ) : null}   

        </div>
    )
}