import React, { FC } from "react";
import DormItem from '../atoms/DormItem'

import styles from './DormList.module.css';

interface dorm {
        dormID: number,
        occupants: number,
        building: string,
        floor: number
}

interface Props {
    dormList: [dorm]
  }

  const DromList: FC<Props> = ({
  dormList
}) => {
  return (
      <>
      <ul className={styles.item}>
          <li>
              Kollektiv
          </li>
          <li>
              Antall beboere
          </li>
          <li>
              Bygg - Etasje
          </li>
      </ul>
    {dormList.map((dorm:any, i:number) =>(
        <DormItem key={i} dorm={dorm} />
    ))}
    </>
  );
};

export default DromList;