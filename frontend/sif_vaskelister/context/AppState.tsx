import React, {FC, useState} from 'react'
import ClientOAuth2, { Token } from 'client-oauth2';
import AppContext from './appContext'
import { get } from '../components/api/.';


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


interface Context {
  todos: any;
  dormList: any;
  addTodo: any;
  completeTodo: any;
  removeTodo: any;
  storeUser: any;
}

export class AuthUser extends Token {
  user?: User;
}

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  dormroom: Number[];
}

interface Dorm {
  data:
  [{
    number: number,
    village: number
  }]
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

      const [user, setUser] = useState<AuthUser>();

      const [dorms, setDorms] = useState<Dorm>();


      // METHODS:

      const getDorms = async () => {
        console.log(user);
        const dorms = await get<Dorm>("/api/dormroom/"+user?.user?.id, {}, { "token": user });
        console.log(dorms);
        setDorms(dorms);
      };

      const getTodoList = async () => {
        console.log(user);
        const dorms = await get<Dorm>("/api/dormroom/"+user?.user?.id, {}, { "token": user });
        console.log(dorms);
      };

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

      const storeUser = (userToStore: AuthUser) => {
        setUser(userToStore);
      };

      const state:any = {
        todos: todos,
        dormList: dormList,
        addTodo: addTodo,
        completeTodo: completeTodo,
        removeTodo: removeTodo,
        storeUser: storeUser,
        user: user,
        getDorms:getDorms,
        getTodoList:getTodoList
      }

    return( 
    <AppContext.Provider value={state}>
        {children}
    </AppContext.Provider>
  );
};

export default AppState;
