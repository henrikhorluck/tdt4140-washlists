import React, { FC } from "react";
import { User } from "../../../../api/auth";

import styles from "./ResidentsListItem.module.css";

interface Props {
  context: any;
  resident: User 
}
const ResidentsListItem: FC<Props> = ({ resident, context }) => {
  return (
    <div className={styles.listItem} >
      {/* <li>{resident.first_name} {resident.last_name}</li> */}
        <li>{resident.username}</li>
        <button className={styles.button} onClick={() => console.log('Button Clicket!')}> Slett</button>
    </div>
  );
};

export default ResidentsListItem;
