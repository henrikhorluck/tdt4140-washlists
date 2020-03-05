export interface Todo {
  id: number;
  desc: null;
  completed: boolean;
  washlist: {
    id: number;
    title: string;
    dormroom: number;
  };
  template: null;
}
