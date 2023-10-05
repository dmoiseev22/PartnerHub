import React from "react";

export default function Search({ handleChange, searchInput, handleSubmit }) {

    return (
        <form autoComplete="off" onSubmit={handleSubmit} className="search-by-article">
            <label htmlFor="search"></label>
            <input 
                type="text" 
                placeholder="Enter product code here"
                onChange={handleChange}
                name="search"
                value={searchInput}
            />
        </form>
    )
}