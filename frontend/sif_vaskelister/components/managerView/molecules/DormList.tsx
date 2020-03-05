import React, { FC, useEffect } from "react";
import DormItem from "../atoms/DormItem";

import styles from "./DormList.module.css";

interface Dorm {
  dormID: number;
  occupants: number;
  building: string;
  floor: number;
}

interface Props {
  context: any;
}

const DormList: FC<Props> = ({ context }) => {
  useEffect(() => {
    context.getDorms();
  }, []);

  return (
    <>
      <ul className={styles.item}>
        <li>Kollektiv</li>
        <li>Antall beboere</li>
        <li>Studentby</li>
      </ul>
      {context.dorms
        ? context.dorms.map((dorm: any, i: number) => (
            <DormItem
              key={i}
              dorm={dorm}
              getDormManager={context.getDormManager}
            />
          ))
        : null}
    </>
  );
};

export default DormList;
