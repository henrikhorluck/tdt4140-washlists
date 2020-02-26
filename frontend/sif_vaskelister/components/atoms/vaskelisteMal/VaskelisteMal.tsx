import React, {useState} from 'react'
import styles from "./vaskelistemal.module.css"


interface vaskeliste {
    vaskepunkt: string;
    beskrivelse: string;
};

const vaskelisteData = {
    "Studentby_1": [
        {vaskepunkt: "Bad", beskrivelse: "Vaske do, dusj, vask"},
        {vaskepunkt: "Kjøkken", beskrivelse: "Vaske benk, ovn, kjøleskap"}
    ]
};

const VaskelisteMal = () => {

    const [vaskeliste, setVaskeliste] = useState<vaskeliste[]>(vaskelisteData.Studentby_1);

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
        setVaskeliste(vaskeliste => [...vaskeliste, {vaskepunkt:"",beskrivelse:""}])
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Send data til backend
    }

    const onUpdate = (index: any, property: string) => (e: any) => {
        let newVaskeliste = [...vaskeliste];
        if (property == "vaskepunkt") {
            newVaskeliste[index].vaskepunkt = e.target.value;
        }
        else if ((property == "beskrivelse")) {
            newVaskeliste[index].beskrivelse = e.target.value;
        }
        setVaskeliste(newVaskeliste);
    }

    return (
        <div className={styles.h1}>
        <h1>Vaskelistemal for Studentby 1</h1>
        <form onSubmit={handleSubmit}>
            <div className={styles.labels}>
                <h2 className={styles.h2}>Vaskepunkt</h2>
                <h2 className={styles.h2}>Beskrivelse</h2>
            </div>
                {vaskeliste.map(({vaskepunkt, beskrivelse}, index) => (
                    <div className={styles.inputPair} key={index}>
                        <input className={styles.input} type="text" name="vaskepunkt" value={vaskepunkt} onChange={onUpdate(index, "vaskepunkt")} />
                        <input className={styles.input} type="text" name="beskrivelse" value={beskrivelse} onChange={onUpdate(index, "beskrivelse")}/>
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

export default VaskelisteMal;