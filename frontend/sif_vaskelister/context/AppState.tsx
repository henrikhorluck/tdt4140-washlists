import React, {FC, useState} from 'react'
import ClientOAuth2, { Token } from 'client-oauth2';
import AppContext from './appContext'
import { get, post } from '../components/api/.';


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

interface Dorms {
  data:
  [{
    number: number,
    village: number
  }]
}

interface Dorm 
  {
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

interface TodoList{
  id: number;
  title: string;
  dormroom: {
    id: number;
    number: number;
    village: {
      id: number;
      name: string;
      templateWashList: number;
    }
  },
  items: [
    {
      id: number;
      desc: null,
      completed: boolean;
      washlist: {
        id: number;
        title: string;
        dormroom: number;
      },
      template: {
        id: number;
        description: string;
        washlist: number;
      }
    }
  ]
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

    const [todos, setTodos] = useState<TodoList>();

      const [user, setUser] = useState<AuthUser>();

      const [dorms, setDorms] = useState<Dorms>();
      const [dorm, setDorm] = useState();


      // METHODS:

      const getDorms = async () => {
        console.log(user);
        const dorms = await get<Dorms>("/api/dormroom/"+user?.user?.id, {}, { "token": user });
        console.log(dorms);
        setDorms(dorms);
      };

      const getDorm = async () => {
        const dorm = await get<Dorm>("/api/dormroom/"+user?.user?.dormroom, {}, { "token": user });
        setDorm(dorm)
      };

      const getTodoList = async () => {
        const dorm = await get<Dorm>("/api/dormroom/"+user?.user?.dormroom, {}, { "token": user });
        const todoList = await get<TodoList>("/api/washlist/"+dorm.id, {}, { "token": user });
        setTodos(todoList);
        console.log(todoList);
      };

      // const addTodo = (text: string) => {
      //   const newTodos = [...todos, { text: text, completed: false }];
      //   setTodos(newTodos);
      // };

      const completeTodo = async (id: number) => {
        // const newTodos = [...todos];
        // newTodos[index].completed = true;
        // setTodos(newTodos);

        const completedTodo = todos?.items.find((item:any)=>(item.id == id));
        if(completedTodo){
          completedTodo.completed = true
        }
        const stringifiedTodo = JSON.stringify(completedTodo)
        console.log(stringifiedTodo);
        await post<TodoList>( "/api/washlistitem/"+id+"/", {stringifiedTodo}, {}, { "token": user });
        const newTodoList = await get<TodoList>("/api/washlist/"+dorm.id, {}, { "token": user });
        setTodos(newTodoList);
      };

      // const removeTodo = (index: number) => {
      //   const newTodos = [...todos];
      //   newTodos.splice(index, 1);
      //   setTodos(newTodos);
      // };

      const storeUser = (userToStore: AuthUser) => {
        setUser(userToStore);
      };

      const state:any = {
        todos: todos,
        dormList: dormList,
        // addTodo: addTodo,
        completeTodo: completeTodo,
        // removeTodo: removeTodo,
        storeUser: storeUser,
        user: user,
        getDorms:getDorms,
        getDorm: getDorm,
        getTodoList:getTodoList
      }

    return( 
    <AppContext.Provider value={state}>
        {children}
    </AppContext.Provider>
  );
};

export default AppState;
