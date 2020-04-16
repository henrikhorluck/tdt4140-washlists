import { TodoItem } from "./washlist-types";
import { Village } from "./village-types";
import { User } from "./user-types";

export interface Dorm {
  id: number;
  number: number;
  residents: User[];
  village: Village;
  items: TodoItem[];
}
