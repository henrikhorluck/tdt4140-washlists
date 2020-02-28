import React, { FC, useEffect, useContext } from "react";
import DormItem from '../atoms/DormItem'

import styles from './DormList.module.css';

interface dorm {
        dormID: number,
        occupants: number,
        building: string,
        floor: number
}

interface Props {
  context: any
  }

  const DromList: FC<Props> = ({
    context
}) => {
  useEffect(()=>{
    console.log(context)
    context.getDorms()
  }, []);

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
    {/* {context.dormList.map((dorm:any, i:number) =>(
        <DormItem key={i} dorm={dorm} />
    ))} */}
    </>
  );
};

export default DromList;