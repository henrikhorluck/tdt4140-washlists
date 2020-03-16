import React, { FC, useState } from "react";
import ResidentsList from '../../molecules/residentsList/ResidentsList'
import ResidentsDropdown from '../../atoms/residentsDropdown/ResidentsDropdown'

import styles from "./ResidentsPage.module.css";

const test = {
  users: {
    residents: [
      {
        id: 7,
        username: 'OlaNordmann',
        email: '',
        first_name: '',
        last_name: '',
        dormroom: 1,
        groups: [
          3
        ],
        manager_villages: [],
        is_manager: false,
        is_student: true
      },
      {
        id: 8,
        username: 'MohammedAli',
        email: '',
        first_name: '',
        last_name: '',
        dormroom: 1,
        groups: [
          3
        ],
        manager_villages: [],
        is_manager: false,
        is_student: true
      }
    ],
  }
}


interface Props {
  context: any;
}

const ResidentsPage: FC<Props> = ({ context }) => {

  return (
    <div className={styles.wrapper}>
      <h1>Beboere i kollektiv {context.dorm ? context.dorm.id : null}</h1>
      <ResidentsList context={context} />
      <ResidentsDropdown context={test}/>
    </div>
  );
};

export default ResidentsPage;
