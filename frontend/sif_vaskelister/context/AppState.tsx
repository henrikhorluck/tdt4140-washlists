import React, { FC, useState } from "react";
import AppContext from "./appContext";
import { get, patch, post, deleteRequest} from "../api/index";
import { AuthUser, User } from '../types/user-types';
import { TemplateItem, TodoItem, WashlistTemplate } from '../types/washlist-types'
import { Village, Villages } from '../types/village-types'
import { Dorm } from '../types/dorm-types'

interface Props {
  children: React.ReactNode;
}


const AppState: FC<Props> = ({ children }) => {
  // DATA:

  const [todos, setTodos] = useState<TodoItem[]>();

  const [user, setUser] = useState<AuthUser>();
  const [availableUsers, setAvailableUsers] = useState<User[]>();

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

  const getResidents = async (id: number) => {
    const dorm = await get<Dorm>("/api/dormroom/" + id, {}, { token: user });
    setDorm(dorm);
  };


  const getAvailableUsers = async () => {
    const users = await get<User[]>("/api/users/", {}, { token: user });
    const availableUsers = users.filter(user => (user.dormroom === null && user.is_student))
    setAvailableUsers(availableUsers);
  };

  const addUser = async (userId: number, dormId: number) => {
    await patch({
      query: "/api/users/" + userId + '/',
      data: { dormroom: dormId },
      parameters: {},
      options: { token: user }
    });
    getResidents(dormId);
    getAvailableUsers();
  };

  const removeUser = async (userId: number, dormId: number) => {
    await patch({
      query: "/api/users/" + userId + '/',
      data: { dormroom: null },
      parameters: {},
      options: { token: user }
    });
    getResidents(dormId);
    getAvailableUsers();
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

  const removeTodo = async (todo: TemplateItem ) => {
    await deleteRequest("/api/template_washlistitem/" + todo.id + '/', {}, {}, { token: user });
    if(villageId){
      getTemplate(villageId);
    }
  };

  const storeUser = (userToStore: AuthUser) => {
    setUser(userToStore);
  };

  const state: any = {
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
