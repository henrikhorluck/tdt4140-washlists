import React, { useState } from "react";
import styles from "./vaskelistemal.module.css";
import Router from "next/router";
import { Vaskeliste } from "./types";
import { vaskelisteData } from "./exampleData";

const VaskelisteMal = () => {
  const [vaskeliste, setVaskeliste] = useState<Vaskeliste[]>(
    vaskelisteData.Studentby_1
  );

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
    setVaskeliste(vaskeliste => [
      ...vaskeliste,
      { vaskepunkt: "", beskrivelse: "" }
    ]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send data til backend
    Router.push("/kollektivOversikt");
  };

  const onUpdate = (index: number, property: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVaskeliste = [...vaskeliste];
    if (property == "vaskepunkt") {
      newVaskeliste[index].vaskepunkt = e.target.value;
    } else if (property == "beskrivelse") {
      newVaskeliste[index].beskrivelse = e.target.value;
    }
    setVaskeliste(newVaskeliste);
  };

  return (
    <div className={styles.h1}>
      <h1>Vaskelistemal for Studentby 1</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.labels}>
          <h2 className={styles.h2}>Vaskepunkt</h2>
          <h2 className={styles.h2}>Beskrivelse</h2>
        </div>
        {vaskeliste.map(({ vaskepunkt, beskrivelse }, index) => (
          <div className={styles.inputPair} key={index}>
            <input
              className={styles.input}
              type="text"
              name="vaskepunkt"
              value={vaskepunkt}
              onChange={onUpdate(index, "vaskepunkt")}
            />
            <input
              className={styles.input}
              type="text"
              name="beskrivelse"
              value={beskrivelse}
              onChange={onUpdate(index, "beskrivelse")}
            />
          </div>
        ))}
        <div className={styles.buttons}>
          <input
            className={styles.button}
            type="button"
            value="Legg til"
            onClick={addField}
          />
          <input className={styles.button} type="button" value="Lagre" />
        </div>
      </form>
    </div>
  );
};

export default VaskelisteMal;
