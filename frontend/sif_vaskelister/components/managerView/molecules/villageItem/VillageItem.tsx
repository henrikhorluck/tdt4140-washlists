import React, {FC} from "react";
import Router from "next/router";

import styles from "./VillageItem.module.css"

interface Manager {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  dormroom: number;
  groups: number[];
  manager_villages: number[];
  is_manager: boolean;
  is_student: boolean;
}

interface Village {
  id: number;
  managers: Manager[];
  dormrooms: number[];
  name: string;
  templateWashList: null;
}

interface Props {
    village: Village;
}

const VillageItem: FC<Props> = ({village}) => {
    return (
        <>
          <h1>Studentby {village.name}</h1>
          <ul className={styles.item}>
            <li>Kollektiv</li>
            <li>Antall beboere</li>
            <li>Vaskestatus</li>
          </ul>
        </>
    );
};

export default VillageItem;