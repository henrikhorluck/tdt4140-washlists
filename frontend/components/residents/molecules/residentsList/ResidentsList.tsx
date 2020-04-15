import React, { FC } from "react";
import ResidentsListItem from '../../atoms/residentsListItem/ResidentsListItem'

import styles from "./ResidentsList.module.css";
import { User } from "../../../../types/user-types";
import { State } from "../../../../context/AppState";


interface Props {
  context: State;
}

const ResidentsList: FC<Props> = ({ context }) => {

  return (
    <div className={styles.listArea}>
      <ul className={styles.items}>
        {context.dorm && context.dorm.residents.length > 0
          ? context.dorm.residents.map((resident: User, i: number) => (
            <ResidentsListItem key={i} resident={resident} context={context}/>
          ))
          : null}
      </ul>
    </div>
  );
};

export default ResidentsList;
