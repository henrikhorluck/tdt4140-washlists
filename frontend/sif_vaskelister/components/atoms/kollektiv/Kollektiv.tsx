import React, {useState} from 'react'
import Link from 'next/link'


interface kollektiv {
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

    const [residents, setResidents] = useState<kollektiv[]>(kollektivData.Kollektiv_1);

    const addField = () => {
        setResidents(residents => [...residents, {navn:"",rom:NaN}])
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    const onUpdate = (index: any, property: string) => (e: any) => {
        console.log("Change");
        let newResidents = [...residents];
        if (property == "navn") {
            newResidents[index].navn = e.target.value;
        }
        else if ((property == "rom")) {
            newResidents[index].rom = e.target.value;
        }
        setResidents(newResidents);
    }

    return (
    <div>
        <h1>Beboere i Kollektiv 1</h1>
        <form onSubmit={handleSubmit}>
            {residents.map(({navn, rom}, index) => (
                <div key={index}>
                    <input type="text" name="navn" value={navn} onChange={onUpdate(index, "navn")} />
                    <input type="number" name="rom" value={rom} onChange={onUpdate(index, "rom")}/>
                </div>
            ))}
            <input type="button" value="Legg til" onClick={addField}/>
            <br/>
            <input type="button" value="Lagre" onClick={handleSubmit}/>
        </form>
    </div>

    );
};


export default Kollektiv;