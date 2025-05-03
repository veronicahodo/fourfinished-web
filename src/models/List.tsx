import { Task } from "./Task";

export interface List {
    id: string;
    owner_id: string;
    title: string;
    color: string;
    icon: string;
    children?: Task[];
}

export const DefaultList: List = {
    id: "",
    owner_id: "",
    title: "",
    color: "",
    icon: "",
};
