export interface TaskHistory {
    task_id: string;
    user_id: string;
    message: string;
    system_message: boolean;
    at: number;
}

export const DefaultTaskHistory: TaskHistory = {
    task_id: "",
    user_id: "",
    message: "",
    system_message: false,
    at: 0,
};
