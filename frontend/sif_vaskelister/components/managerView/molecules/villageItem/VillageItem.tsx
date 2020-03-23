import React, { FC } from "react";
import Router from "next/router";
import { Village } from '../../../../types/village-types'
import { TodoItem } from '../../../../types/washlist-types'
import { Dorm } from '../../../../types/dorm-types'
import styles from "./VillageItem.module.css"







interface Props {
    village: Village;
    dorms: Dorm[];
    getTemplate: any;
    getResidents: any;
}

const VillageItem: FC<Props> = ({village, dorms, getTemplate, getResidents}) => {
    const count = (items: TodoItem[]) => {
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
                      getResidents(dorm.number)
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