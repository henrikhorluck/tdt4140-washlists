import React, { FC, useState } from "react";
import AppContext from "./appContext";
import { get, patch, post } from "../api";
import { AuthUser, User } from "../api/auth";

interface Props {
  children: React.ReactNode;
}


// interface Dorms {
//   id: number;
//   number: number;
//   village: {
//     id: number;
//     name: string;
//     templateWashList: {
//       id: number;
//       title: string;
//     };
//   };
//   residents: number[];
//   washlist: {
//     id: number;
//     title: string;
//     dormroom: {
//       id: number;
//       number: number;
//       village: number;
//     };
//   };
// }

// interface Dorm {
//   id: number;
//   number: number;
//   village: {
//     id: number;
//     name: string;
//     templateWashList: {
//       id: number;
//       title: string;
//     };
//   };
//   residents: User[];
//   washlist: {
//     id: number;
//     title: string;
//     dormroom: {
//       id: number;
//       number: number;
//       village: number;
//     };
//   };
// }

interface TodoItem {
  id: number;
  description: string;
  completed: boolean;
  dormroom_id: number;
  template: number;
}

interface Dorm {
  id: number;
  number: number;
  residents: User[];
  village: {
    id: number;
    managers: User[];
    name: string;
    templateWashList: number;
  };
  items: TodoItem[];
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

interface Village {
  id: number;
  managers: SIFUser[];
  dormrooms: number[];
  name: string;
  templateWashList: null;
}

interface Villages {
  villages: Village[];
}

interface Item {
  id: number;
  description: string;
  completed: boolean;
  dormroom_id: number;
  template: null;
}


interface Dorms {
  dorms: Dorm[];
}

const AppState: FC<Props> = ({ children }) => {
  // DATA:

  const [todos, setTodos] = useState<TodoItem[]>();

  const [user, setUser] = useState<AuthUser>();

  const [dorms, setDorms] = useState<Dorm[]>();
  const [dorm, setDorm] = useState<Dorm>();

  const [villages, setVillages] = useState<Villages>();
  const [village, setVillage] = useState<Village>();

  // METHODS:

  const getVillages = async () => {
    const villages = await get<Villages>("/api/villages/", {}, {token: user});
    setVillages(villages);
  };

  const getVillage = async (id: number) => {
    const village = await get<Village>("/api/villages/" + id, {}, {token: user});
    setVillage(village);
  };

  const getDorms = async () => {
    const dorms = await get<Dorm[]>("/api/dormroom/", {}, { token: user });
    setDorms(dorms);
  };

  const getDorm = async () => {
    const dorm = await get<Dorm>(
      "/api/dormroom/" + user?.user?.dormroom,
      {},
      { token: user }
    );
    setDorm(dorm);
  };

  // const getDormManager = async (id: number) => {
  //   const dorm = await get<Dorm>("/api/dormroom/" + id, {}, { token: user });
  //   setDorm(dorm);
  //   const todoList = await get<TodoList>(
  //     "/api/washlist/" + dorm.id,
  //     {},
  //     { token: user }
  //   );
  //   setTodos(todoList);
  // };

  const getTodoList = async () => {
    const dorm = await get<Dorm>(
      "/api/dormroom/" + user?.user?.dormroom,
      {},
      { token: user }
    );
    setDorm(dorm);
    const { items } = dorm;
    setTodos(items);
  };

  const addTodo = async (text: string) => {
    const washlist = {
      "description": text,
      "dormroom_id": dorm?.id,
    };
    await post("/api/washlistitem/", { ...washlist }, {}, { token: user });
    const newTodoList = await get<Dorm>(
      "/api/dormroom/" + dorm?.id,
      {},
      { token: user }
    );
    setTodos(newTodoList.items);
  };

  const completeTodo = async (id: number) => {
    const completedTodo = todos?.find((item: any) => item.id == id);
    const completed = completedTodo ? (completedTodo.completed = true) : null;
    await patch({
      query: "/api/washlistitem/" + id + "/",
      data: { completed },
      parameters: {},
      options: { token: user }
    });
    const dorm = await get<Dorm>(
      "/api/dormroom/" + user?.user?.dormroom,
      {},
      { token: user }
    );
    setDorm(dorm);
    const { items } = dorm;
    setTodos(items);
  };

  // const removeTodo = (index: number) => {
  //   const newTodos = [...todos];
  //   newTodos.splice(index, 1);
  //   setTodos(newTodos);
  // };

  const storeUser = (userToStore: AuthUser) => {
    setUser(userToStore);
  };

  const state: any = {
    todos: todos,
    dorms: dorms,
    addTodo: addTodo,
    completeTodo: completeTodo,
    // removeTodo: removeTodo,
    storeUser: storeUser,
    user: user,
    getDorms: getDorms,
    getDorm: getDorm,
    getTodoList: getTodoList,
    // getDormManager: getDormManager,
    villages: villages,
    getVillages: getVillages,
    village: village,
    getVillage: getVillage,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppState;
