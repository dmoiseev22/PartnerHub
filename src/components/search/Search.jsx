import React from "react";

export default function Search({ handleChange, searchInput, handleSubmit }) {

    return (
        <form autocomplete="off" onSubmit={handleSubmit} className="search-by-article">
            <label htmlFor="search"></label>
            <input 
                type="text" 
                placeholder="Search by code"
                onChange={handleChange}
                name="search"
                value={searchInput}
            />
            {/* <button type="submit">Search</button> */}
        </form>
    )
}