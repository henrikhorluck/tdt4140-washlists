import { Manager } from './user-types'

export interface Village {
    id: number;
    managers: Manager[];
    dormrooms: number[];
    name: string;
    templateWashList: number[];
  }

  export interface Villages {
    villages: Village[];
  }