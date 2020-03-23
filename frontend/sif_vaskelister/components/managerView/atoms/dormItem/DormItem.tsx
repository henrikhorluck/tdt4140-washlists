import React, { FC } from "react";
import Router from "next/router";

import styles from "./DormItem.module.css";
import {Dorm} from '../../../../types/dorm-types';

interface Props {
  dorm: Dorm;
  context: any;
}

const DromItem: FC<Props> = ({ dorm, context }) => {
  return (
    <ul className={styles.item}>
      <li>
        <button
          onClick={() => {
            context.getResidents(dorm.id)
            Router.push("/residents");
          }}
        >
          {dorm.number}
        </button>
      </li>
      <li className={styles.residents}>{dorm.residents.length}</li>
      <li className={styles.villageName}>{dorm.village.name}</li>
    </ul>
  );
};

export default DromItem;
