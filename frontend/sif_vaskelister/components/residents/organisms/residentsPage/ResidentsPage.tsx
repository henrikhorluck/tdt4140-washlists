import React, { FC } from "react";
import ResidentsList from '../../molecules/residentsList/ResidentsList'

import styles from "./ResidentsPage.module.css";

const user = {
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


interface Props {
  context: any;
}

const ResidentsPage: FC<Props> = ({ context }) => {

const showDropdown = () => {
  const dropdownList = document.getElementById('dropdownList');
  if(dropdownList){
    dropdownList.style.display === 'block' ? dropdownList.style.display = 'none' : dropdownList.style.display = 'block';
  }
  
}

  return (
    <>
      <ResidentsList context={context} />
      <div className={styles.dropdown}>
        <div>
      <button onClick={() => showDropdown() } >Select student to add</button>
        <ul id='dropdownList' className={styles.dropdownList}>
          {user.residents.map((resident: any, i: number) => (
            <li key={i}>{resident.username}</li>
          ))}
        </ul>
        </div>
        <button>add</button>
      </div>
    </>
  );
};

export default ResidentsPage;
