import React, { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { CartContext } from "../../App"
import { Turn as Hamburger } from 'hamburger-react'
import companyLogo from "../../assets/img/logo.png"


export default function Header() {

    const [isOpen, setOpen] = React.useState(false)
    const [windowSize, setWindowSize] = React.useState(window.innerWidth)
    const [isHamburgerVisible, setIsHamburgerVisible] = React.useState(window.innerWidth < 500)
    const [cart] = useContext(CartContext)
    const isLoggedIn = localStorage.getItem("loggedin")


    function toggleMenu() {
        setOpen(!isOpen)
    }

    React.useEffect(() => {
        const handleResize = (e) => {
            const newWindowWidth = e.target.innerWidth
            setWindowSize(newWindowWidth)
            setIsHamburgerVisible(newWindowWidth < 500)
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const activeStyles = {
        backgroundColor: "#fff"
    }

    const quantityOfItemsInCart = (cart) ? Object.keys(cart).length : null

    return (
        <header>
            <nav className="navbar container">
                <div className="navbar-fixed">

                    <div className="site-logo">
                        <Link to="/">
                            <img src={companyLogo} alt="company logo" />
                        </Link>
                    </div>
                    {/* CLICKING HUMBURGER TOGGLES OPEN/CLOSE MENU  */}
                    {isHamburgerVisible &&
                        (<Hamburger
                            toggled={isOpen}
                            toggle={setOpen}
                            size={20}
                            aria-label="open/close menu button"
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
                                onClick={() => setOpen(!isOpen)}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className="navbar-link"
                                to="tools"
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={() => setOpen(!isOpen)}
                            >
                                Tools
                            </NavLink>
                            <NavLink
                                className="navbar-link"
                                to="promos"
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={() => setOpen(!isOpen)}
                            >
                                Promos
                            </NavLink>
                            <NavLink
                                className="navbar-link"
                                to="cart"
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={() => setOpen(!isOpen)}
                            >
                                Cart
                                <span className="header-cart-quantity-indicator">
                                    {isLoggedIn && (quantityOfItemsInCart > 0) && quantityOfItemsInCart}
                                </span>
                            </NavLink>

                            <NavLink 
                                className="navbar-link"
                                to="ai" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={()=>setOpen(!isOpen)}
                            >
                                AI
                            </NavLink>
                            <NavLink
                                className="navbar-link"
                                to="login"
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={() => setOpen(!isOpen)}
                            >
                                Login
                            </NavLink>
                        </ul>
                    </div>)
                }
            </nav>
        </header>
    )
}