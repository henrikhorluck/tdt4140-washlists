import React, {FC, useState} from 'react'
import ClientOAuth2, { Token } from 'client-oauth2';
import AppContext from './appContext'
import { get, patch, post } from '../components/api/.';


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
  data:[
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
          last_login: any;
          is_superuser: boolean;
          username: string;
          first_name:string;
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
              permissions: []
            }
          ],
          user_permissions: []
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
  ]
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

    const [todos, setTodos] = useState<TodoList>();

      const [user, setUser] = useState<AuthUser>();

      const [dorms, setDorms] = useState<Dorms>();
      const [dorm, setDorm] = useState();


      // METHODS:

      const getDorms = async () => {
        const dorms = await get<Dorms>("/api/dormroom/", {}, { "token": user });
        setDorms(dorms);
      };

      const getDorm = async () => {
        const dorm = await get<Dorm>("/api/dormroom/"+user?.user?.dormroom, {}, { "token": user });
        setDorm(dorm)
      };

      const getDormManager = async (id: number) => {
        const dorm = await get<Dorm>("/api/dormroom/"+id, {}, { "token": user });
        setDorm(dorm)
        const todoList = await get<TodoList>("/api/washlist/"+dorm.id, {}, { "token": user });
        setTodos(todoList);
      };

      const getTodoList = async () => {
        const dorm = await get<Dorm>("/api/dormroom/"+user?.user?.dormroom, {}, { "token": user });
        setDorm(dorm)
        const todoList = await get<TodoList>("/api/washlist/"+dorm.id, {}, { "token": user });
        setTodos(todoList);
      };

      const addTodo = async (text: string) => {
        const data = {
          desc: text,
          washlist: todos?.id
        }
        await post( "/api/washlistitem/", {},{}, { "token": user });
        const newTodoList = await get<TodoList>("/api/washlist/"+dorm.id, {}, { "token": user });
        setTodos(newTodoList);
      };

      const completeTodo = async (id: number) => {
        const completedTodo = todos?.items.find((item:any)=>(item.id == id));
        const completed = completedTodo ? completedTodo.completed = true : null;
        await patch( {query:"/api/washlistitem/"+id+"/", data:{completed}, parameters:{}, options:{ "token": user }});
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
        dorms: dorms,
        addTodo: addTodo,
        completeTodo: completeTodo,
        // removeTodo: removeTodo,
        storeUser: storeUser,
        user: user,
        getDorms:getDorms,
        getDorm: getDorm,
        getTodoList:getTodoList,
        getDormManager: getDormManager
      }

    return( 
    <AppContext.Provider value={state}>
        {children}
    </AppContext.Provider>
  );
};

export default AppState;
