import TodoList from "../components/TodoList/molecules/TodoList/TodoList";
import Main from "../components/template/Main"
import React, { FC } from "react";
import DormItem from '../components/managerView/atoms/DormItem'
import DormList from '../components/managerView/molecules/DormList'
import styles from './DormItem.module.css';


interface Props {
    dorm:{
        dormID: number,
        occupants: number,
        building: string,
        floor: number
    };
    removeTodo: (n: number) => void;
  }

const dormList: any = [
    {
        dormID: 1,
        occupants: 3,
        building: 'A',
        floor: 2
    },
    {
        dormID: 2,
        occupants: 5,
        building: 'B',
        floor: 4
    },
    {
        dormID: 3,
        occupants: 7,
        building: 'A',
        floor: 1
    },
    {
        dormID: 4,
        occupants: 1,
        building: 'C',
        floor:6
    }
]

const Manager: FC<Props>  = () => {

    return( 
        <Main>
            <DormList dormList={dormList}></DormList>
        </Main>
  );
};

export default Manager;