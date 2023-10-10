import React from "react"
import { NavLink, Outlet } from 'react-router-dom'

export default function Promos() {

    return (
        <div className="promos-wrapper">
            <div className="promos-selection">

                <h3>Promotions</h3>
                <p>Get to know the latest factory promotions and your exclusive offers</p>

                <div className="promos-selectors">

                    <NavLink 
                        to=""
                        style={({ isActive })=>{ return (isActive) ? {backgroundColor: "#b81b1b", borderRadius: "25px", color: "#fff"} : null}}
                        className="promos-selectors-btn"
                        aria-label="show general promos"
                        end
                    >
                            GENERAL 
                    </NavLink>

                    <NavLink 
                    style={({ isActive })=>{ return (isActive) ? {backgroundColor: "#b81b1b", borderRadius: "25px", color: "#fff"} : null}}
                        to="./recommended"
                        className="promos-selectors-btn"
                        aria-label="show recommended promos"
                    >
                            EXCLUSIVE
                    </NavLink>
                </div>
            </div>

            <Outlet />

        </div>
    )
}