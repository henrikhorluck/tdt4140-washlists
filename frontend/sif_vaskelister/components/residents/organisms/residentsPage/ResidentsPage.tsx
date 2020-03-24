import React, { FC, useEffect } from "react";
import ResidentsList from '../../molecules/residentsList/ResidentsList'
import ResidentsDropdown from '../../atoms/residentsDropdown/ResidentsDropdown'

import styles from "./ResidentsPage.module.css";
import Link from "next/link";
import { State } from "../../../../context/AppState";


interface Props {
  context: State;
}

const ResidentsPage: FC<Props> = ({ context }) => {

  useEffect(() => {
    context.getAvailableUsers && context.getAvailableUsers()
  }, []);

  return (
    <div className={styles.wrapper}>
      <Link href="/manager-view">
        <button
          className={styles.button}
          type="button"
        >
          <p>Tilbake</p>
        </button>
      </Link>
      <h1>Beboere i kollektiv {context.dorm ? context.dorm.id : null}</h1>
      <ResidentsList context={context}/>
      <ResidentsDropdown context={context}/>
    </div>
  );
};

export default ResidentsPage;
