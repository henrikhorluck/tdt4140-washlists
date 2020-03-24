import React, { FC } from "react";
import { Village } from '../../../../types/village-types'
import { TodoItem } from '../../../../types/washlist-types'
import { Dorm } from '../../../../types/dorm-types'
import styles from "./VillageItem.module.css"
import Link from "next/link";


interface Props {
  village: Village;
  dorms?: Dorm[];
  getTemplate?: (village: number) => Promise<void>;
  getResidents?: (id: number) => Promise<void>;
}

const VillageItem: FC<Props> = ({ village, dorms, getTemplate, getResidents }) => {
  const count = (items: TodoItem[]) => {
    let checked = 0;
    items.forEach(item => item.completed ? checked += 1 : null);
    return checked;
  };

  return (
    <>
      <h1>Studentby {village.name}</h1>
      <Link href="/washlist-template">
        <button type="button"
                onClick={() => {
                  getTemplate && getTemplate(village.id);
                }}
        >
          Endre vaskeliste
        </button>
      </Link>
      <ul className={styles.item}>
        <li>Kollektiv</li>
        <li>Antall beboere</li>
        <li>Vaskestatus</li>
      </ul>
      {dorms ? dorms.map((dorm: Dorm, i: number) => (
        dorm.village.id === village.id ?
          <ul key={i} className={styles.item}>
            <li>
              <Link href="/residents">
                <button
                  onClick={() =>
                    getResidents && getResidents(dorm.number)
                  }
                >
                  {dorm.number}
                </button>
              </Link>
            </li>
            <li>{dorm.residents.length}</li>
            <li>{count(dorm.items)}/{dorm.items.length}</li>
          </ul> : null
      )) : null}
    </>
  );
};

export default VillageItem;