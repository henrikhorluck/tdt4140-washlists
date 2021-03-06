import React, { FC, useState } from "react";

import styles from "./ResidentsDropdown.module.css";
import { State } from "../../../../context/AppState";
import { User } from "../../../../types/user-types";


interface Props {
  context: State;
}

const ResidentsDropdown: FC<Props> = ({ context: { addUser, availableUsers, dorm } }) => {

  const [text, setText] = useState('Legg til student');
  const [userId, setUserId] = useState<number>(-1);

  const showDropdown = () => {
    const dropdownList = document.getElementById('dropdownList');
    const downArrow = document.getElementById('downArrow');
    const rightArrow = document.getElementById('rightArrow');
    if (dropdownList && downArrow && rightArrow) {
      dropdownList.style.display === 'block' ? dropdownList.style.display = 'none' : dropdownList.style.display = 'block';
      downArrow.style.display === 'none' ? downArrow.style.display = 'block' : downArrow.style.display = 'none';
      rightArrow.style.display === 'block' ? rightArrow.style.display = 'none' : rightArrow.style.display = 'block';
    }

  };

  const selectDropdown = (resident: User) => {
    showDropdown();
    setText(resident.username);
    setUserId(resident.id)

  };

  const _addUser = () => {
    if (userId !== -1) {
      addUser && addUser(userId, dorm!.id);
      setText('Legg til student');
      setUserId(-1)
    }
  };

  return (
    <>
      <div className={styles.dropdown}>
        <div>
          <button className={styles.dropdownButton} onClick={() => showDropdown()}><p id='downArrow'
                                                                                      className={styles.downArrow}>▼</p>
            <p id='rightArrow' className={styles.rightArrow}>▶︎</p> <p className={styles.buttonText}>{text}</p></button>
          <ul id='dropdownList' className={styles.dropdownList}>
            {availableUsers ? availableUsers.map((resident: User, i: number) => (
              <li className={styles.dropdownListText} key={i}
                  onClick={() => selectDropdown(resident)}>{resident.username}</li>
            )) : null}
          </ul>
        </div>
        <button className={styles.addButton} onClick={() => _addUser()}>Legg til</button>
      </div>
    </>
  );
};

export default ResidentsDropdown;
