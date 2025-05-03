import { Task } from "../models/Task";
import { useCrud } from "./useCrud"

export const useTask = (api: string, throwError?: (code: number, message: string) => void) => {
    const { loading, createRecord, retrieveRecord, updateRecord, deleteRecord } = useCrud(api);

    const createTask = async (task: Task): Promise<Task | undefined> => await createRecord<Task>("/v1/task", task, throwError);
    const retrieveTask = async (id: string): Promise<Task | undefined> => await retrieveRecord<Task>("/v1/task/" + id, undefined, throwError);
    const retrieveByParent = async (id: string): Promise<Task[] | undefined> => await retrieveRecord<Task[]>(`/v1/task/${id}/children`, undefined, throwError);
    const updateTask = async (task: Task): Promise<Task | undefined> => {
        console.log(task)
        return await updateRecord<Task>("/v1/task/" + task.id, task, throwError);
    }
    const deleteTask = async (id: string): Promise<boolean | undefined> => await deleteRecord<boolean>("/v1/task/" + id, throwError);

    return {
        loading,
        createTask,
        retrieveTask,
        retrieveByParent,
        updateTask,
        deleteTask
    }
}

