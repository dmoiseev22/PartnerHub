import React from 'react'
import clearFilterImg from '../../../src/assets/clear.png'

export default function DiscsFilters({ handleFilterChange, machineFilter, materialFilter }) {

    return (
        <>
            <div className="tools-list-filter-buttons-machines">

                {/* FIRST ROW OF FILTER BUTTONS */}
                    <button
                        onClick={() => handleFilterChange("machine", "angle grinder")}
                        className={
                            `tools-machine angle-grinder 
                            ${machineFilter === "angle grinder" ? "selected" : ""}`
                        }
                    >Angle grinder</button>

                    <button
                        onClick={() => handleFilterChange("machine", "table saw")}
                        className={
                            `tools-machine table-saw 
                            ${machineFilter === "table saw" ? "selected" : ""}`
                        }
                    >Table saw</button>

                    <button
                        onClick={() => handleFilterChange("machine", "cut-off machine")}
                        className={
                            `tools-machine cut-off-machine 
                            ${machineFilter === "cut-off machine" ? "selected" : ""}`
                        }
                    >Cut-off machine</button>

                    {machineFilter ? (
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

                    <h3></h3>
                    <button
                        onClick={() => handleFilterChange("material", "concrete")}
                        className={
                            `tools-material concrete 
                            ${materialFilter === "concrete" ? "selected" : ""}`
                        }
                    >Concrete</button>

                    <button
                        onClick={() => handleFilterChange("material", "reinforced concrete")}
                        className={
                            `tools-material reinforced-concrete 
                            ${materialFilter === "reinforced concrete" ? "selected" : ""}`
                        }
                    >Reinforced concrete</button>

                    <button
                        onClick={() => handleFilterChange("material", "granite")}
                        className={
                            `tools-material granite 
                            ${materialFilter === "granite" ? "selected" : ""}`
                        }
                    >Granite</button>

                    <button
                        onClick={() => handleFilterChange("material", "porcelain")}
                        className={
                            `tools-material porcelain 
                            ${materialFilter === "porcelain" ? "selected" : ""}`
                        }
                    >Porcelain</button>

                {materialFilter ? (
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