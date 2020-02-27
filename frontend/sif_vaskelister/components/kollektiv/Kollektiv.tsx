import React, {useState, useEffect} from 'react'
import styles from "./kollektiv.module.css"

interface Kollektiv {
    navn: string;
    rom: number;
}

// Eksempeldata
const kollektivData = {
    "Kollektiv_1":[
        {navn: "Ola Nordmann", rom: 1},
        {navn: "Kari Nordmann", rom: 2}
    ],
    "Kollektiv_2":[
        {navn: "Karl Gustav", rom: 3}
    ],
};


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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Send data til backend
    }

    const onUpdate = (index: any, property: string) => (e: any) => {
        const newResidents = [...residents];
        if (property == "navn") {
            newResidents[index].navn = e.target.value;
        }
        else if ((property == "rom")) {
            newResidents[index].rom = e.target.value;
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
                <input className={styles.button} type="button" value="Lagre" onClick={handleSubmit}/>
            </div>
        </form>
    </div>

    );
};


export default Kollektiv;