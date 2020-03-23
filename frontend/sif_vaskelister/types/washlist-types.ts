import {Village} from './village-types'

export interface TodoItem {
    id: number;
    description: string;
    completed: boolean;
    dormroom_id: number;
    template: number;
  }

  export interface TempItem{
    id: number;
    description: string;
    washlist: number;
  }

  export interface WashlistTemplate {
    id: number;
    title: string;
    villages: Village[];
    template_items: TempItem[];
  }