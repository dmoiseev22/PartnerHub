import React from "react"
import { NavLink, Outlet } from 'react-router-dom'

export default function Promos() {



    return (
        <div className="promos-wrapper">
            <div className="promos-selection">

                <h3>Promotions</h3>
                <p>Get to know the latest factory promotions, as well as your exclusive offers</p>

                <div className="promos-selectors">
                    <NavLink 
                        to=""
                        style={({ isActive })=>{ return (isActive) ? {backgroundColor: "rgb(234, 162, 162)"} : null}}
                        end
                    >
                        <div className="promos-selectors-btn">
                            <p>General </p>
                        </div>
                    </NavLink>

                    <NavLink 
                    style={({ isActive })=>{ return (isActive) ? {backgroundColor: "rgb(234, 162, 162)"} : null}}
                        to="./recommended"
                    >
                        <div className="promos-selectors-btn">
                            <p>Exclusive</p> 
                        </div>
                    </NavLink>
                </div>
            </div>

            <Outlet />
        </div>
    )
}