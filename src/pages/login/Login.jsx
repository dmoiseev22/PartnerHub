import React from "react";
import BarLoader from 'react-spinners/BarLoader'
import { Link } from "react-router-dom"
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from "firebase/database" 
import { useLocation, useNavigate } from "react-router-dom"
import firebaseConfig from "../../components/authentication/config";

export default function Login() {
    const [input, setInput] = React.useState("")
    const [clientId, setClientId] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [isLoggedIn, setIsLoggedIn] = React.useState(
        JSON.parse(window.localStorage.getItem("loggedin"))
    )

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || "/login";

    const userData = JSON.parse(window.localStorage.getItem("partners-app-local-storage"))

    React.useEffect(()=>{
        
        if (clientId) {
            const app = initializeApp(firebaseConfig)
            const database = getDatabase(app)
            const clientDatabase = ref(database, `clients/` + clientId)

            onValue(clientDatabase, function(snapshot){
                setLoading(true)
                setTimeout(()=>setLoading(false), 10000)
                let clientData = Object.values(snapshot.val())
                if (clientData) {
                    window.localStorage.setItem(
                        "partners-app-local-storage", 
                        JSON.stringify(clientData[0])
                    )
                    localStorage.setItem("loggedin", true)
                    setIsLoggedIn(true)
                    
                    returnToPrevPage()
                } else {console.log("unsuccessfull login intent")}
                setLoading(false)
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
        setLoading(false)
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


                {(!isLoggedIn) ? (
                    "Enter partner ID for access"
                ) : ( <div className="login-greeting">
                        <b>{greeting(userData?.user.name)}!</b> <br /> <br /><br /> 
                        You are logged in and now can see your a special prices and exclusive offers.
                        </div>
                    )}

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

                <BarLoader  loading={loading} color="#C31313" width="160px"/>
                {loading && <p>Loading, please wait...</p>}

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