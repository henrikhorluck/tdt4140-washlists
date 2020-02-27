import React, {FC, useState} from 'react'
import AppContext from './appContext'


interface Props {
    children: React.ReactNode;
}

interface Todo {
  completed: boolean;
  text: string;
}

interface Todos {
  todos: Array<Todo>;
}

const AppState: FC<Props> = ( {children} ) => {

  // DATA:

    const [dormList, setState] = useState([
        {
            dormID: 1,
            residentNumber: 3,
            building: 'A',
            floor: 2,
            residents:[
              {navn: "Ola Nordmann", rom: 1},
              {navn: "Kari Nordmann", rom: 2}
            ],
            cleaningList:[
              {
                task: 'bla bla bla',
                description: 'more bla bla bla bla bla'
              }
            ]
        },
        {
            dormID: 2,
            residentNumber: 5,
            building: 'B',
            floor: 4,
            residents:[
              {navn: "Ola Nordmann", rom: 1},
              {navn: "Kari Nordmann", rom: 2}
            ],
            cleaningList:[
              {
                task: 'bla bla bla',
                description: 'more bla bla bla bla bla'
              }
            ]
        },
        {
            dormID: 3,
            residentNumber: 7,
            building: 'A',
            floor: 1,
            residents:[
              {navn: "Ola Nordmann", rom: 1},
              {navn: "Kari Nordmann", rom: 2}
            ],
            cleaningList:[
              {
                task: 'bla bla bla',
                description: 'more bla bla bla bla bla'
              }
            ]
        },
        {
            dormID: 4,
            residentNumber: 1,
            building: 'C',
            floor:6,
            residents:[
              {navn: "Ola Nordmann", rom: 1},
              {navn: "Kari Nordmann", rom: 2}
            ],
            cleaningList:[
              {
                task: 'bla bla bla',
                description: 'more bla bla bla bla bla'
              }
            ]
        }
    ]);

    const [todos, setTodos] = useState([
        {
          text: "Vaske bad",
          completed: false
        },
        {
          text: "Vaske gulv",
          completed: false
        },
        {
          text: "Vaske stue",
          completed: false
        }
      ]);


      // METHODS:

      const addTodo = (text: string) => {
        const newTodos = [...todos, { text: text, completed: false }];
        setTodos(newTodos);
      };

      const completeTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos[index].completed = true;
        setTodos(newTodos);
      };

      const removeTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
      };

      const state:any = {
        todos: todos,
        dormList: dormList,
        addTodo: addTodo,
        completeTodo: completeTodo,
        removeTodo: removeTodo
      }

    return( 
    <AppContext.Provider value={state}>
        {children}
    </AppContext.Provider>
  );
};

export default AppState;
