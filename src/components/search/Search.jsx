import React from "react";

export default function Search({ handleChange, searchInput, handleSubmit }) {

    return (
        <form autocomplete="off" onSubmit={handleSubmit} className="search-by-article">
            <label htmlFor="search"></label>
            <div>
                <input 
                    type="text" 
                    placeholder="Enter product code here"
                    onChange={handleChange}
                    name="search"
                    value={searchInput}
                />
                {/* <button type="submit">Search</button> */}
            </div>
        </form>
    )
}