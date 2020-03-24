import { User } from "./user-types";

export interface Village {
  id: number;
  managers: User[];
  dormrooms: number[];
  name: string;
  templateWashList?: number;
}
