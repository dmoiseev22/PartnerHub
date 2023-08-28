import React from "react"
import { Link, NavLink } from "react-router-dom"
import { Turn as Hamburger } from 'hamburger-react'
// import { FaRegUserCircle } from 'react-icons/fa'


import companyLogo from "../assets/logo.png"


export default function Header() {

    const [isOpen, setOpen] = React.useState(false)
    const [windowSize, setWindowSize] = React.useState(window.innerWidth)
    const [isHamburgerVisible, setIsHamburgerVisible] = React.useState(window.innerWidth < 500)

    function toggleMenu(){
        setOpen(!isOpen)
    }

    React.useEffect(() => {
        const handleResize = (e) => {
            const newWindowWidth = e.target.innerWidth
            console.log("newWindowWidth: ", newWindowWidth)
            setWindowSize(newWindowWidth)
            setIsHamburgerVisible(newWindowWidth < 500)
        }
        
        window.addEventListener('resize', handleResize);
        
        return () => {
         window.removeEventListener('resize', handleResize);
        };
        
      }, []);

    const activeStyles = {
        // textDecoration: "underline",
        // color: "#fff"
        backgroundColor: "aliceblue"
    }
    
    return (
        <header>
            <nav className="navbar container">
                <div className="navbar-fixed">
                    
                    <div className="site-logo">
                        <Link to="/">
                            <img src={companyLogo} alt="company logo" />
                        </Link>
                    </div>
                    {/* <FaRegUserCircle size="1.5em" /> */}
                    {/* CLICKING HUMBURGER TOGGLES OPEN/CLOSE MENU  */}
                    {isHamburgerVisible && 
                        (<Hamburger 
                        toggled={isOpen} 
                        toggle={setOpen} 
                        size={20}
                        />)
                    }

                </div>
                {/* MENU ITEMS VISIBLE 1 OF 2 CONDITIONS ARE MET: SCREENS > 500px WIDTH OR IF HAMBURGER IS NOT VISIBLE */}
                {(isOpen || (!isHamburgerVisible)) && 
                    (<div className="navbar-links-container">
                        <ul className="navbar-links" >
                            <NavLink 
                                className="navbar-link"
                                to="/" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                className="navbar-link"
                                to="promos" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >
                                Promos
                            </NavLink>
                            <NavLink 
                                className="navbar-link"
                                to="tools" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >
                                Tools
                            </NavLink>                    
                            <NavLink 
                                className="navbar-link"
                                to="feedback" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >
                                Feedback
                            </NavLink>
                        </ul>
                    </div>)
}
            </nav>
        </header>
    )
}