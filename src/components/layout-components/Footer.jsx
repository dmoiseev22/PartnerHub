import React from "react"
import Modal from "../modal/Modal"
import ChatButton from "../assistant/ChatButton"

export default function Footer() {

    const [isModalOpen, setModalOpen] = React.useState(false)
    let cookiesConsentAccepted = JSON.parse(window.localStorage.getItem('sd-cookies-accepted')) || false
    
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
            
            <ChatButton />

            <p className="footer-text">2024. Demo version. Built by D.M.</p>

            {!cookiesConsentAccepted && isModalOpen ? <Modal closeModal={closeModal}/> : null}            

        </footer>
    )
}