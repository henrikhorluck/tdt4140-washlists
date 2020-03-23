import React, { FC, useState } from "react";
import AppContext from "./appContext";
import { get, patch, post, deleteRequest} from "../api/index";
import { AuthUser, User } from "../api/auth";

interface Props {
  children: React.ReactNode;
}

export interface TempItem{
  id: number;
  description: string;
  washlist: number;
}

interface Manager {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  dormroom: number;
  groups: number[];
  manager_villages: number[];
  is_manager: boolean;
  is_student:  boolean;
}

interface Village {
  id: number;
  managers: Manager[];
  dormrooms: number[];
  name: string;
  templateWashList: number[];
}

interface WashlistTemplate {
  id: number;
  title: string;
  villages: Village[];
  template_items: TempItem[];
}

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
  village: Village;
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


interface Villages {
  villages: Village[];
}



const AppState: FC<Props> = ({ children }) => {
  // DATA:

  const [todos, setTodos] = useState<TodoItem[]>();

  const [user, setUser] = useState<AuthUser>();

  const [dorms, setDorms] = useState<Dorm[]>();
  const [dorm, setDorm] = useState<Dorm>();
  const [template, setTemplate] = useState<WashlistTemplate>()
  const [villageId, setVillageId] = useState<number>()

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

  const getTemplate = async (village: number) => {
    const template = await get<WashlistTemplate>(
      "/api/template_washlist/" + village,
      {},
      { token: user }
    );
    console.log(template)
    setVillageId(village);
    setTemplate(template);
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
  }
const addTodoManager = async (text: string) => {
  const washlist = {
      description: text,
      washlist: villageId
    };
    await post("/api/template_washlistitem/", { ...washlist }, {}, { token: user });
    if(villageId){
      getTemplate(villageId);
    }
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

  const removeTodo = async (todo: TempItem ) => {
    await deleteRequest("/api/template_washlistitem/" + todo.id + '/', {}, {}, { token: user });
    if(villageId){
      getTemplate(villageId);
    }
  };

  const storeUser = (userToStore: AuthUser) => {
    setUser(userToStore);
  };

  const state: any = {
    todos: todos,
    dorms: dorms,
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
    getTemplate,
    template,
    removeTodo,
    addTodo,
    addTodoManager
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppState;
