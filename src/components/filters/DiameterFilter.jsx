import React from "react"

export default function DiameterFilter({ diameterArr, handleFilterChange }) {

    const [diameterFilter, setDiameterFilter] = React.useState()
    console.log('diameterFilter', diameterFilter)


    React.useEffect(()=>{
        setDiameterFilter()
    }, [diameterArr])

    return (
        <div className="tools-list-filter-buttons-diameter">

            <h5>Ø</h5>
            
            {diameterArr.map((diameter) => {
                return (
                    <button
                        key={diameter}
                        onClick={() => {
                            handleFilterChange("diameter", diameter)
                            setDiameterFilter(diameter)}
                        }
                        className={`tools-diameter 
                        ${diameterFilter === diameter ? "selected" : null}`}
                    > {diameter}</button>
                )
            })}
            
            {<button
                    onClick={() => {
                        handleFilterChange("diameter", null)
                        setDiameterFilter(null)}
                    }
                    className="tools-diameter clear-filters"
                    >Clear filter</button>
            }   

        </div>
    )
}

