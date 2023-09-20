import React from "react"
import { Link } from 'react-router-dom'
import backgroundImg from '../../../src/assets/img/home-background-tiles.jpeg'
import drycutIcon from '../../../src/assets/product-range-icons/drycut.png'
import hiloIcon from '../../../src/assets/product-range-icons/hilo.png'
import muralIcon from '../../../src/assets/product-range-icons/mural.png'
import precastIcon from '../../../src/assets/product-range-icons/precast.png'
import pulidoIcon from '../../../src/assets/product-range-icons/pulido.png'
import juntasIcon from '../../../src/assets/product-range-icons/juntas.png'
import wetcutIcon from '../../../src/assets/product-range-icons/wetcut.png'
import brocaIcon from '../../../src/assets/product-range-icons/broca.png'





export default function Home() {
    
    return (

        <div>
            <div className="home-page-welcome-section" style={{backgroundImage: `url(${backgroundImg})`}}>
            {/* <div className="home-page-welcome-section" > */}

                {/* <img > */}
                <h1>Welcome to Solga CIS Customer Hub</h1>
                <Link to="/tools">
                    <button
                        className="home-explore-button" >
                        EXPLORE DIAMOND TOOLS
                    </button>
                </Link>
            </div>
            
            <div className="home-page-about-section">
                <h3>About Us</h3>
                <p>Since 1958, Solga Diamant has been a recognized global leader in the 
                    Construction and Stone industry, serving customers in over 60 countries. 
                    <br/>
                    <br/>
                    We are dedicated to delivering exceptional value to our partners through continuous innovation and a steadfast commitment to high-quality products and services.</p>
                <div className="home-about-inner-container">
                    <div className="home-about-left">
                        <ul>
                            <li><p className="home-emoji">💎💎💎</p><br/><p>1000+ diamond tools</p></li>
                            <li><p className="home-emoji">🌐</p><br/> <p>Presence in 60+ countries</p></li>
                            <li><p className="home-emoji">⏱️</p><br/> <p>90% of orders processed in 24h</p></li>
                            <li><p className="home-emoji">🇪🇸</p><br/> <p>Factory in Spain</p></li>
                        </ul>
                    </div>
                    <div className="home-about-right">
                        <ul>
                            <li><p className="home-emoji">💼</p><br/> <p> Personal manager </p></li>
                            <li><p className="home-emoji">🤝🏻</p><br/> <p> We speak your language</p></li>                        
                            <li><p className="home-emoji">🧑‍🔬</p><br/> <p>Expertise since 1958</p></li>
                            <li><p className="home-emoji">✅</p><br/> <p>ISO9001</p></li>
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
                        className="home-explore-button" >
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
                        className="home-explore-button" >
                        PROMOTIONS
                    </button>
                    </Link>

                </div>
            </div>

            <div className="home-page-range-section">

                <h3>Order management</h3>

                <div className="home-page-range-inner">

                    <p>Add your products asily as you navigate. </p>
                    <p> Try one of our "Fast Order" recommendations inside Cart section </p>
                    <p> <span style={{color: "red", fontSize: '12px'}}> Login required</span></p>

                    <Link to="cart">
                    <button
                        className="home-explore-button" >
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