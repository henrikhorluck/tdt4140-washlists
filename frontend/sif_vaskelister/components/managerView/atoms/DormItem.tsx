import React, { FC } from "react";

import styles from './DormItem.module.css';

interface Props{ 
dorm: {
    id: number;
    number: number;
    village: {
      id: number;
      name: string;
      templateWashList: {
        id: number;
        title: string;
      }
    },
    residents: [
      {
        id: number;
        password: string;
        last_login: string;
        is_superuser: boolean;
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        is_staff: boolean;
        is_active: boolean;
        date_joined: string;
        dormroom: {
          id: number;
          number: number;
          village: number;
        },
        groups: [
          {
            id: number;
            name: string;
            permissions: any;
          }
        ],
        user_permissions: any;
      },
      {
        id: number;
        password: string;
        last_login: any;
        is_superuser: boolean;
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        is_staff: boolean;
        is_active: boolean;
        date_joined: string;
        dormroom: {
          id: number;
          number: number;
          village: number;
        },
        groups: [
          {
            id: number;
            name: string;
            permissions: any;
          }
        ],
        user_permissions: any;
      }
    ],
    washlist: {
      id: number;
      title: string;
      dormroom: {
        id: number;
        number: number;
        village: number;
      }
    }
  }
}

 const DromItem: FC<Props> = ({
  dorm
}) => {
  return (
    <ul className={styles.item}>
        <li>
        <button onClick={() => {}}>{dorm.number}</button>
        </li>
        <li>
            {dorm.residents.length}
        </li>
        <li>
            {dorm.village.name}
        </li>
    </ul>
  );
};

export default DromItem;