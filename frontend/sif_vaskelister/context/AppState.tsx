import React, { FC, useState } from "react";
import AppContext from "./appContext";
import { deleteRequest, get, patch, post } from "../api";
import { AuthUser, User } from '../types/user-types';
import { TempItem, TodoItem, WashlistTemplate } from '../types/washlist-types'
import { Village } from '../types/village-types'
import { Dorm } from '../types/dorm-types'

interface Props {
  children: React.ReactNode;
}

export interface State {
  user?: AuthUser;
  dorm?: Dorm;
  village?: Village;
  todos?: TodoItem[];
  dorms?: Dorm[];
  villages?: Village[];
  template?: WashlistTemplate;
  availableUsers?: User[];
  getTodoList?: () => Promise<void>;
  getDorm?: () => Promise<void>;
  getVillages?: () => Promise<void>;
  getDorms?: () => Promise<void>;
  getTemplate?: (village: number) => Promise<void>;
  addUser?: (userId: number, dormId: number) => Promise<void>;
  getResidents?: (id: number) => Promise<void>;
  getVillage?: (id: number) => Promise<void>;
  getAvailableUsers?: () => Promise<void>;
  addTodo?: (text: string) => Promise<void>;
  removeTodo?: (todo: TempItem) => Promise<void>;
  completeTodo?: (id: number) => Promise<void>;
  removeUser?: (userId: number, dormId: number) => Promise<void>;
  storeUser?: (userToStore: AuthUser) => void;
  addTodoManager?: (text: string) => Promise<void>;
}


const AppState: FC<Props> = ({ children }) => {
  // DATA:

  const [todos, setTodos] = useState<TodoItem[]>();

  const [user, setUser] = useState<AuthUser>();
  const [availableUsers, setAvailableUsers] = useState<User[]>();

  const [dorms, setDorms] = useState<Dorm[]>();
  const [dorm, setDorm] = useState<Dorm>();
  const [template, setTemplate] = useState<WashlistTemplate>();
  const [villageId, setVillageId] = useState<number>();

  const [villages, setVillages] = useState<Village[]>();
  const [village, setVillage] = useState<Village>();

  // METHODS:

  const getVillages = async () => {
    const villages = await get<Village[]>("/api/villages/", {}, { token: user });
    setVillages(villages);
  };

  const getVillage = async (id: number) => {
    const village = await get<Village>("/api/villages/" + id, {}, { token: user });
    setVillage(village);
  };

  const getDorms = async () => {
    const dorms = await get<Dorm[]>("/api/dormroom/", {}, { token: user });
    setDorms(dorms);
  };

  const getResidents = async (id: number) => {
    const dorm = await get<Dorm>("/api/dormroom/" + id, {}, { token: user });
    setDorm(dorm);
  };


  const getAvailableUsers = async () => {
    const users = await get<User[]>("/api/users/", {}, { token: user });
    const availableUsers = users.filter(user => (user.dormroom === null && user.is_student));
    setAvailableUsers(availableUsers);
  };

  const addUser = async (userId: number, dormId: number) => {
    await patch({
      query: "/api/users/" + userId + '/',
      data: { dormroom: dormId },
      parameters: {},
      options: { token: user }
    });
    await getResidents(dormId);
    await getAvailableUsers();
  };

  const removeUser = async (userId: number, dormId: number) => {
    await patch({
      query: "/api/users/" + userId + '/',
      data: { dormroom: null },
      parameters: {},
      options: { token: user }
    });
    await getResidents(dormId);
    await getAvailableUsers();
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
    setVillageId(village);
    setTemplate(template);
  };


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
  const addTodoManager = async (text: string) => {
    const washlist = {
      description: text,
      washlist: villageId
    };
    await post("/api/template_washlistitem/", { ...washlist }, {}, { token: user });
    if (villageId) {
      await getTemplate(villageId);
    }
  };

  const completeTodo = async (id: number) => {
    const completedTodo = todos?.find((item: TodoItem) => item.id == id);
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

  const removeTodo = async (todo: TempItem) => {
    await deleteRequest("/api/template_washlistitem/" + todo.id + '/', {}, {}, { token: user });
    if (villageId) {
      await getTemplate(villageId);
    }
  };

  const storeUser = (userToStore: AuthUser) => {
    setUser(userToStore);
  };

  const state: State = {
    villages,
    getVillages,
    village,
    getVillage,
    getTemplate,
    template,
    removeTodo,
    addTodo,
    addTodoManager,
    todos,
    dorms,
    dorm,
    completeTodo,
    storeUser,
    user,
    getDorms,
    getDorm,
    getTodoList,
    getResidents,
    getAvailableUsers,
    availableUsers,
    addUser,
    removeUser
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppState;
