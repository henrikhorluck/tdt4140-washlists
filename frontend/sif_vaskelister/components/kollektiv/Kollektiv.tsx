import React, {useState, useEffect} from 'react'
import styles from "./kollektiv.module.css"
import Router from 'next/router'
import {Kollektiv} from "./types"
import {kollektivData} from "./exampleData";

// Eksempeldata



const Kollektiv = () => {

    const [residents, setResidents] = useState<Kollektiv[]>(kollektivData.Kollektiv_1);

//     async function fetchData() {
//         const res = await fetch("https://localhost:8000/.....");
//         res.json()
//            .then(res => setResidents(res));
//     }
//
//     useEffect(() => {
//        fetchData();
//     });

    const addField = () => {
        setResidents(residents => [...residents, {navn:"",rom:NaN}])
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Send data til backend
        Router.push("/kollektivOversikt")
    }

    const onUpdate = (index: number, property: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newResidents = [...residents];
        if (property == "navn") {
            newResidents[index].navn = e.target.value;
        }
        else if ((property == "rom")) {
            newResidents[index].rom = Number(e.target.value);
        }
        setResidents(newResidents);
    }

    return (
    <div className={styles.h1}>
        <h1>Beboere i Kollektiv 1</h1>
        <form onSubmit={handleSubmit}>
            <div className={styles.labels}>
                <h2 className={styles.h2}>Navn</h2>
                <h2 className={styles.h2}>Rom</h2>
            </div>
                {residents.map(({navn, rom}, index) => (
                    <div className={styles.inputPair} key={index}>
                        <input className={styles.input} type="text" name="navn" value={navn} onChange={onUpdate(index, "navn")} />
                        <input className={styles.input} type="number" name="rom" value={rom} onChange={onUpdate(index, "rom")}/>
                    </div>
                ))}
            <div className={styles.buttons}>
                <input className={styles.button} type="button" value="Legg til" onClick={addField}/>
                <input className={styles.button} type="submit" value="Lagre"/>
            </div>
        </form>
    </div>

    );
};


export default Kollektiv;