import React from "react"
import Modal from "../modal/Modal"


export default function Footer() {

    const [isModalOpen, setModalOpen] = React.useState(false)
    let cookiesConsentAccepted = JSON.parse(window.localStorage.getItem('sd-cookies-accepted')) || false

    console.log('cookiesConsentAccepted: ', cookiesConsentAccepted)
    
    function closeModal(){
        setModalOpen(false)
        cookiesConsentAccepted = true
        window.localStorage.setItem('sd-cookies-accepted', JSON.stringify(cookiesConsentAccepted))
    }

    React.useEffect(()=>{
        if (!cookiesConsentAccepted) {
            setTimeout(()=>{
                setModalOpen(true)
            }, 3000)
        } 
    },[])
    
    return (
        <footer className="footer">
            <p className="footer-text">2023</p>

            {!cookiesConsentAccepted && isModalOpen ? <Modal closeModal={closeModal}/> : null}            

        </footer>
    )
}