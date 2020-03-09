import React, { FC } from "react";
import Router from "next/router";

import styles from "./DormItem.module.css";
import {User} from "../../../../api/auth";

interface Props {
  dorm: {
    id: number;
    number: number;
    village: {
      id: number;
      name: string;
      templateWashList: {
        id: number;
        title: string;
      };
    };
    residents: User[];
    washlist: {
      id: number;
      title: string;
      dormroom: {
        id: number;
        number: number;
        village: number;
      };
    };
  };
  getDormManager: any;
}

const DromItem: FC<Props> = ({ dorm, getDormManager }) => {
  return (
    <ul className={styles.item}>
      <li>
        <button
          onClick={() => {
            getDormManager(dorm.id);
            Router.push("/washlist-template");
          }}
        >
          {dorm.number}
        </button>
      </li>
      <li>{dorm.residents.length}</li>
      <li>{dorm.village.name}</li>
    </ul>
  );
};

export default DromItem;
