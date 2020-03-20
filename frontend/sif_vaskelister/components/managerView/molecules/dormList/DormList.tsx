import React, { FC, useEffect } from "react";
import DormItem from "../../atoms/dormItem/DormItem";

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
      {context.dorms && context.dorms.length > 0
        ? context.dorms.map((dorm: any, i: number) => (
            <DormItem
              key={i}
              dorm={dorm}
              getTemplate={context.getTemplate}
            />
          ))
        : null}
    </>
  );
};

export default DormList;
