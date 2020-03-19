import React, { FC, useState } from "react";

import styles from "./ResidentsDropdown.module.css";


interface Props {
  context: any;
}

const ResidentsDropdown: FC<Props> = ({ context }) => {

  const [text, setText] = useState('Legg til student') 
  const [userId, setUserId] = useState(null)

  const showDropdown = () => {
    const dropdownList = document.getElementById('dropdownList');
    const downArrow = document.getElementById('downArrow');
    const rightArrow = document.getElementById('rightArrow');
    if(dropdownList && downArrow && rightArrow){
      dropdownList.style.display === 'block' ? dropdownList.style.display = 'none' : dropdownList.style.display = 'block';
      downArrow.style.display === 'none' ? downArrow.style.display = 'block' : downArrow.style.display = 'none';
      rightArrow.style.display === 'block' ? rightArrow.style.display = 'none' : rightArrow.style.display = 'block';
    }
    
  }

  const selectDropdown = (resident: any) => {
    showDropdown()
    setText(resident.username)
    setUserId(resident.id)
    
  }

  const addUser = () => {
    context.addUser(userId ,context.dorm.id)
    setText('Legg til student')
    setUserId(null)
  }

  return (
    <>
      <div className={styles.dropdown}>
        <div>
  <button className={styles.dropdownButton} onClick={() => showDropdown() } > <p  id='downArrow' className={styles.downArrow}>▼</p> <p id='rightArrow' className={styles.rightArrow}>▶︎</p> <p className={styles.buttonText}>{text}</p></button>
        <ul id='dropdownList' className={styles.dropdownList}>
          {context.availableUsers ? context.availableUsers.map((resident: any, i: number) => (
            <li className={styles.dropdownListText} key={i} onClick={() => selectDropdown(resident)} >{resident.username}</li>
          )) : null}
        </ul>
        </div>
        <button className={styles.addButton} onClick={() => addUser()} >Legg til</button>
      </div>
    </>
  );
};

export default ResidentsDropdown;
