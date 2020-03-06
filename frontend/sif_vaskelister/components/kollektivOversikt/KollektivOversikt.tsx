import React from 'react'
import Link from 'next/link'
import {vaskelisteData} from "../vaskelisteMal/exampleData";
import {kollektivData} from "../kollektiv/exampleData";
import styles from "./kollektivOversikt.module.css";


const KollektivOversikt = () => {

    return (
        <div>
            <h1>KollektivOversikt</h1>
            <Link href="/kollektivOversikt">
                <input type="button" value="Tilbake"/>
            </Link>
            <div className={styles.layout}>
                <div className={styles.box}>
                    <div className={styles.labels}>
                        <h2 className={styles.h2}>Navn</h2>
                        <h2 className={styles.h2}>Rom</h2>
                    </div>
                    <ul className={styles.ul}>
                        {kollektivData.Kollektiv_1.map(({navn, rom}, index) => (
                            <div className={styles.li} key={index}>
                                <li>{navn}</li>
                                <li>{rom}</li>
                            </div>
                        ))}
                    </ul>


                    <Link href="/kollektiv">
                        <input type="button" value="Legg til/endre beboere"/>
                    </Link>
                </div>

                <div>
                    <div className={styles.labels}>
                        <h2 className={styles.h2}>Vaskeliste</h2>
                    </div>
                    <ul className={styles.ul}>
                        {vaskelisteData.Studentby_1.map(({vaskepunkt, beskrivelse}, index) => (
                            <div className={styles.li} key={index}>
                                <li>{vaskepunkt}</li>
                            </div>
                        ))}
                    </ul>

                    <Link href="/mal">
                        <input type="button" value="Legg til/endre vaskeliste"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default KollektivOversikt;