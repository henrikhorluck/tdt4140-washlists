import React, {useState} from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

const login = async (username: String, password: String) => {
    const clientId = "9NqDDj7qdZIVJi0sSketxpBg57ajSicGvU3ovDhi"
    const clientSecret = "TKvX7d0PbCVcmbkMbcXgNoMn9WqL8W3Pzmkhbe3xtYF2GEFkW4efm6SRng4MzoN5GMiXDsjqoqZrro9XwHouaZ26I4qIrxcf6QqnHDS8uCaICAocvVU5uKwfldiy8HTF"

    let req = new Request(`http://localhost:8000/o/token/`, {
        method: 'POST',
        body: `grant_type=password&username=${username}&password=${password}`,
        headers: {
            "Authorization": `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    })
    const res = await fetch(req)
    const json = await res.json()
    Object.keys(json).forEach(key => window.localStorage.setItem(key, json[key]))
}

const Home = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div>
        <Head>
            <title>SIF Vaskelister - Hjem</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <Nav/>

        <div>
            <h1>Velkommen til SIF Vaskelister!</h1>
            <label>
                <p>Brukernavn</p>
                <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                <p>Passord</p>
                <input type="password" required onChange={(e) => setPassword(e.target.value)} value={password}/>
            </label>
            <button type="button" onClick={async () => {
                await login(username, password)
            }}>
                <p>Logg inn</p>
            </button>
        </div>
    </div>
}

export default Home
