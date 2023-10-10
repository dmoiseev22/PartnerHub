import React from "react"
import { Link } from 'react-router-dom'
// import backgroundImg from '../../../src/assets/img/home-background-tiles.jpeg'
import backgroundImg from '../../../src/assets/img/background-mural.jpg'

import drycutIcon from '../../../src/assets/product-range-icons/drycut.png'
import hiloIcon from '../../../src/assets/product-range-icons/hilo.png'
import muralIcon from '../../../src/assets/product-range-icons/mural.png'
import precastIcon from '../../../src/assets/product-range-icons/precast.png'
import pulidoIcon from '../../../src/assets/product-range-icons/pulido.png'
import juntasIcon from '../../../src/assets/product-range-icons/juntas.png'
import wetcutIcon from '../../../src/assets/product-range-icons/wetcut.png'
import brocaIcon from '../../../src/assets/product-range-icons/broca.png'
import { icons } from "../../components/icons/Icon"

export default function Home() {
    
    return (

        <div>
            <div className="home-page-welcome-section" style={{backgroundImage: `url(${backgroundImg})`}}>
                <h1>WELCOME TO CIS PARTNER HUB</h1>
                <Link to="/tools">
                    <button
                        className="home-explore-button" >
                        EXPLORE DIAMOND TOOLS
                    </button>
                </Link>
            </div>
            
            <div className="home-page-about-section">
                <h3>ABOUT </h3>
                <p>Solga Diamant, established in 1958 in Barcelona, stands as a distinguished global leader in the diamond tools manufacturing industry. With a rich history spanning over six decades, we have been dedicated to serving customers in more than 60 countries, consistently delivering top-tier products and expertise to the construction and stone sectors worldwide. </p>
                    <div className="home-about-inner-container">
                    <div className="home-about-left">
                        <ul>
                            <li className="home-emoji"><img src={icons.diamond} alt="" /><p>1000+ diamond tools</p></li>
                            <li className="home-emoji"><img src={icons.network} alt="" /> <p>Presence in 60+ countries</p></li>
                            <li className="home-emoji"><img src={icons.fast} alt="" /> <p>90% of orders sent in 24h</p></li>
                            <li className="home-emoji"><img src={icons.spain} alt="" /> <p>Factory in Spain</p></li>
                        </ul>
                    </div>
                    <div className="home-about-right">
                        <ul>
                            <li className="home-emoji"><img src={icons.team} alt="" /> <p> Personal manager </p></li>
                            <li className="home-emoji"><img src={icons.language} alt="" /> <p> We speak your language</p></li>                        
                            <li className="home-emoji"><img src={icons.scientist} alt="" /> <p>Expertise since 1958</p></li>
                            <li className="home-emoji"><img src={icons.iso} alt="" /> <p>ISO9001</p></li>
                        </ul>
                    </div>
                </div>
            </div> 

            <div className="home-page-range-section">

                <h3>Product Range</h3>

                <div className="home-page-range-inner">
                    <ul>
                        <li><img src={drycutIcon} alt="" /><br/>Dry cut</li>
                        <li><img src={wetcutIcon} alt="" /><br/>Wet cut</li>
                        <li><img src={brocaIcon} alt="" /><br/>Drill Bits </li>
                        <li><img src={muralIcon} alt="" /><br/>Wall Saw</li>
                        <li><img src={pulidoIcon} alt="" /><br/>Grinding</li>
                        <li><img src={juntasIcon} alt="" /><br/>Floor Saw</li>
                        <li><img src={precastIcon} alt="" /><br/>Precast</li>
                        <li><img src={hiloIcon} alt="" /><br/>Wire</li>
                    </ul>

                    <Link to="/tools">
                    <button
                        className="home-button red-btn" >
                        EXPLORE
                    </button>
                    </Link>

                </div>
            </div>

            <div className="home-page-range-section">

                <h3>Promotions</h3>

                <div className="home-page-range-inner">
                    <p>Explore our latest promotions and tailor-made recommendations for your business</p>
                    <p> <span style={{color: "red", fontSize: '12px'}}> Login required</span></p>

                    <Link to="promos">
                    <button
                        className="home-button red-btn" >
                        PROMOTIONS
                    </button>
                    </Link>

                </div>
            </div>

            <div className="home-page-range-section">

                <h3>Order management</h3>

                <div className="home-page-range-inner">

                    <p>Add your products as you navigate </p>
                    <p> <span style={{color: "red", fontSize: '12px'}}> Login required</span></p>

                    <Link to="cart">
                    <button
                        className="home-button red-btn" >
                        START YOUR ORDER
                    </button>
                    </Link>

                </div>
            </div>

            <div className="home-page-why-section">
                <h3>Factory tour</h3>
                <div className="video-container">
                    <iframe 
                        width="99%"  src="https://www.youtube-nocookie.com/embed/fWsutB5S2gI?si=zu_qMqM59x2owdT7" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen>
                    </iframe>
                </div>
            </div>

        </div>
    )
}