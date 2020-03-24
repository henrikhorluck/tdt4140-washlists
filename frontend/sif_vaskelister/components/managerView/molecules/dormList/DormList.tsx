import React, { FC, useEffect } from "react";
import DormItem from "../../atoms/dormItem/DormItem";

import styles from "./DormList.module.css";
import { State } from "../../../../context/AppState";
import { Dorm } from "../../../../types/dorm-types";


interface Props {
  context: State;
}

const DormList: FC<Props> = ({ context }) => {

  const { getDorms, dorms } = context;

  useEffect(() => {
    getDorms && getDorms();
  }, []);

  return (
    <>
      <ul className={styles.item}>
        <li>Kollektiv</li>
        <li>Antall beboere</li>
        <li>Studentby</li>
      </ul>
      {dorms && dorms.length > 0
        ? dorms.map((dorm: Dorm, i: number) => (
          <DormItem
            key={i}
            dorm={dorm}
            context={context}
          />
        ))
        : null}
    </>
  );
};

export default DormList;
