import React, { FC } from "react";

import { Dorm } from "../../../../types/dorm-types";
import Link from "next/link";
import { State } from "../../../../context/AppState";

import styles from "./DormItem.module.css";

interface Props {
  dorm: Dorm;
  context: State;
}

const DromItem: FC<Props> = ({ dorm, context: { getResidents } }) => {
  return (
    <ul className={styles.item}>
      <li>
        <Link href="/residents">
          <button
            onClick={() => {
              getResidents && getResidents(dorm.id);
            }}
          >
            {dorm.number}
          </button>
        </Link>
      </li>
      <li className={styles.residents}>{dorm.residents.length}</li>
      <li className={styles.villageName}>{dorm.village.name}</li>
    </ul>
  );
};

export default DromItem;
