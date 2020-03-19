import React, { FC, useEffect } from "react";
import ResidentsList from '../../molecules/residentsList/ResidentsList'
import ResidentsDropdown from '../../atoms/residentsDropdown/ResidentsDropdown'
import Router from "next/router";

import styles from "./ResidentsPage.module.css";


interface Props {
  context: any;
}

const ResidentsPage: FC<Props> = ({ context }) => {

  useEffect(() => {
    context.getAvailableUsers()
  }, [])

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          Router.push("/manager-view");
        }}
      >
        <p>Tilbake</p>
      </button>
      <h1>Beboere i kollektiv {context.dorm ? context.dorm.id : null}</h1>
      <ResidentsList context={context} />
      <ResidentsDropdown context={context}/>
    </div>
  );
};

export default ResidentsPage;
