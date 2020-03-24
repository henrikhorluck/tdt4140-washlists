import React, { FC } from "react";
import { User } from "../../../../types/user-types";

import styles from "./ResidentsListItem.module.css";
import { State } from "../../../../context/AppState";

interface Props {
  context: State;
  resident: User;
}

const ResidentsListItem: FC<Props> = ({ resident, context }) => {
  return (
    <div className={styles.listItem}>
      <li>{resident.username}</li>
      <button className={styles.button}
              onClick={() => context.removeUser && context.removeUser(resident.id, context.dorm!.id)}> Fjern fra
        kollektiv
      </button>
    </div>
  );
};

export default ResidentsListItem;
