export interface Todo {
  id: number;
  description: null;
  completed: boolean;
  washlist: {
    id: number;
    title: string;
    dormroom: number;
  };
  template: null;
}
