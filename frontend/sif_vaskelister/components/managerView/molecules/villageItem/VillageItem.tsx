import React, {FC, useEffect} from "react";
import Router from "next/router";
import Link from "next/link";

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

interface SIFUser {
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

interface Item {
  id: number;
  description: string;
  completed: boolean;
  dormroom_id: number;
  template: null;
}

interface Dorm {
  id: number;
  number: number;
  residents: SIFUser[];
  village: {
    id: number;
    managers: SIFUser[];
    dormrooms: number[];
    name: string;
    templateWashList: null;
  };
  items: Item[];
}

interface Props {
    village: Village;
    dorms: Dorm[];
    getTemplate: any;
    getResidents: any;
}

const VillageItem: FC<Props> = ({village, dorms, getTemplate, getResidents}) => {
    const count = (items: Item[]) => {
      let checked = 0;
      items.forEach(item => item.completed ? checked += 1 : null);
      return checked;
  };

    return (
        <>
          <h1>Studentby {village.name}</h1>
          <button type="button"
                  onClick={() => {
                    getTemplate(village.id);
                    Router.push("/washlist-template");
                  }}
          >
            Endre vaskeliste
          </button>
          <ul className={styles.item}>
            <li>Kollektiv</li>
            <li>Antall beboere</li>
            <li>Vaskestatus</li>
          </ul>
          {dorms ? dorms.map((dorm: Dorm, i: number) => (
              dorm.village.id === village.id ?
              <ul key={i} className={styles.item}>
                <li>
                  <button
                    onClick={() => {
                      getResidents(dorm.id)
                      Router.push("/residents");
                    }}
                  >
                    {dorm.number}
                  </button>
                </li>
                <li>{dorm.residents.length}</li>
                <li>{count(dorm.items)}/{dorm.items.length}</li>
              </ul> : null
          )) : null}
        </>
    );
};

export default VillageItem;