import React from 'react'
import clearFilterImg from '../../../src/assets/clear.png'


export default function WireFilter({ handleFilterChange, machineFilter, materialFilter }) {

    return (
        <>
            <div className="tools-list-filter-buttons-machines">

                {/* FIRST ROW OF FILTER BUTTONS */}
                    <button
                        onClick={() => handleFilterChange("machine", "medium power")}
                        className={
                            `tools-machine medium-power
                            ${machineFilter === "medium power" ? "selected" : ""}`
                        }
                    >Medium power</button>

                    <button
                        onClick={() => handleFilterChange("machine", "high power")}
                        className={
                            `tools-machine high-power
                            ${machineFilter === "high power" ? "selected" : ""}`
                        }
                    >High power</button>
                    



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
                        onClick={() => handleFilterChange("material", "steel")}
                        className={
                            `tools-material steel 
                            ${materialFilter === "steel" ? "selected" : ""}`
                        }
                    >Steel</button>

                    <button
                        onClick={() => handleFilterChange("material", "masonry")}
                        className={
                            `tools-material masonry 
                            ${materialFilter === "masonry" ? "selected" : ""}`
                        }
                    >Masonry</button>

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