import React, { FC } from "react";

import styles from './DormItem.module.css';

interface Props {
    dorm:{
        dormID: number,
        occupants: number,
        building: string,
        floor: number
    };
  }

 const DromItem: FC<Props> = ({
  dorm
}) => {
  return (
    <ul className={styles.item}>
        <li>
        <button onClick={() => {}}>{dorm.dormID}</button>
        </li>
        <li>
            {dorm.occupants}
        </li>
        <li>
            {dorm.building}-{dorm.floor}
        </li>
    </ul>
  );
};

export default DromItem;