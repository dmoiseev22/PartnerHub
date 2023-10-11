import React from "react";
import { Link } from "react-router-dom"
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from "firebase/database" 
import { useLocation, useNavigate } from "react-router-dom"

export default function Login() {
    const [input, setInput] = React.useState("")
    const [clientId, setClientId] = React.useState("")
    const [isLoggedIn, setIsLoggedIn] = React.useState(
        JSON.parse(window.localStorage.getItem("loggedin"))
    )

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || "/login";

    const userData = JSON.parse(window.localStorage.getItem("partners-app-local-storage"))

    
    React.useEffect(()=>{
        const firebaseConfig = {
            apiKey: "AIzaSyBD_OUECP1sYXgzdk1q83HrrXUVq7o0lls",
            authDomain: "solga-partners-home.firebaseapp.com",
            databaseURL: "https://solga-partners-home-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "solga-partners-home",
            storageBucket: "solga-partners-home.appspot.com",
            messagingSenderId: "1037744607558",
            appId: "1:1037744607558:web:ed96850c9ae6e7b6d3d547"
          };
        
        if (clientId) {
            const app = initializeApp(firebaseConfig)
            const database = getDatabase(app)
            const clientDatabase = ref(database, `clients/` + clientId)

            onValue(clientDatabase, function(snapshot){
                let clientData = Object.values(snapshot.val())
                console.log(clientData)
                if (clientData) {
                    window.localStorage.setItem(
                        "partners-app-local-storage", 
                        JSON.stringify(clientData[0])
                    )
                    localStorage.setItem("loggedin", true)
                    setIsLoggedIn(true)
                    returnToPrevPage()
                } else {console.log("unsuccessfull login intent")}
            })
        }
        
    }, [clientId])



    function handleSubmit(e) {
        e.preventDefault()
        
        if (isLoggedIn) {
            window.localStorage.removeItem("partners-app-local-storage")
            window.localStorage.removeItem("loggedin")
            setIsLoggedIn(!isLoggedIn)
        }

        setClientId(input)
        setInput("")
    }
    
    function handleChange(e){
        setInput(e.target.value)
    }

    function greeting(name){
        const today = new Date()
        const curHr = today.getHours()
        
        if (curHr < 12) {
          return `Good morning, ${name}`
        } else if (curHr < 18) {
          return `Good afternoon, ${name}`
        } else {
          return `Good evening, ${name}`
        }
    }

    function returnToPrevPage(){
        setTimeout(()=>{
            navigate(from, { replace: true })
        }, 2000)
    }

    return (
        <div className="login-form-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
                
                {
                    location.state?.message &&
                        <h3 className="login-error">{location.state.message}</h3>
                }

                {/* <label htmlFor="id"> */}
                    {(!isLoggedIn) ? (
                        "Enter partner ID for access"
                    ) : ( <div className="login-greeting">
                            <b>{greeting(userData?.user.name)}!</b> <br /> <br /><br /> 
                            You are logged in and now can see your a special prices and exclusive offers.
                         </div>
                        )}
                {/* </label> */}

                <input 
                    autoFocus
                    autoComplete="off"
                    type="text" 
                    onChange={handleChange}
                    name="id"
                    value={input}
                    placeholder="Enter your id here"
                    style={{ display: isLoggedIn ? "none" : "block" }}
                />

                <div className="login-buttons">
                    {
                    isLoggedIn &&  
                        <Link to="../../tools">
                                <button
                                    className="login-button green-button" 
                                    aria-label="explore tools" >
                                    EXPLORE
                                </button>
                            </Link>
                    }

                    <button
                        className="login-button" 
                        aria-label="login button">
                        {(!isLoggedIn) ? "LOG IN" : "LOG OUT" }

                    </button>
                </div>
                
            </form>
        </div>
        
    )
}