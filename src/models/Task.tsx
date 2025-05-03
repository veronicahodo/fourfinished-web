import { TaskHistory } from "./TaskHistory";

export interface Task {
    id: string;
    owner_id: string;
    parent_id: string;
    title: string;
    description: string;
    completion: number;
    created_at: number;
    updated_at: number;
    archived: boolean;
    tags?: string[];
    assignees?: string[];
    history?: TaskHistory[];
    children?: Task[];
}

export const DefaultTask: Task = {
    id: "",
    owner_id: "",
    parent_id: "",
    title: "",
    description: "",
    completion: 0,
    created_at: 0,
    updated_at: 0,
    archived: false,
    tags: [],
    assignees: [],
    history: [],
};
