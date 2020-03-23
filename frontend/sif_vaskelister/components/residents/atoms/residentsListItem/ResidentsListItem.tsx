import React, { FC } from "react";
import { User } from "../../../../types/user-types";

import styles from "./ResidentsListItem.module.css";

interface Props {
  context: any;
  resident: User;
}
const ResidentsListItem: FC<Props> = ({ resident, context }) => {
  return (
    <div className={styles.listItem} >
        <li>{resident.username}</li>
        <button className={styles.button} onClick={() => context.removeUser(resident.id, context.dorm.id)}> Fjern fra kollektiv</button>
    </div>
  );
};

export default ResidentsListItem;
