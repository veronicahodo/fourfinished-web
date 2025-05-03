import { List } from "../models/List";
import { useCrud } from "./useCrud"

export const useList = (api: string, throwError?: (code: number, message: string) => void) => {
    const { loading, createRecord, retrieveRecord, updateRecord, deleteRecord } = useCrud<List>(api);

    const createList = async (list: List): Promise<List | undefined> => await createRecord<List>("/v1/list", list, throwError);
    const retrieveList = async (id: string): Promise<List | undefined> => await retrieveRecord<List>("/v1/list/" + id, undefined, throwError);
    const retrieveAllLists = async (): Promise<List[] | undefined> => await retrieveRecord<List[]>("/v1/list/all/", undefined, throwError);
    const updateList = async (list: List): Promise<List | undefined> => await updateRecord<List>("/v1/list/" + list.id, list, throwError);
    const deleteList = async (id: string): Promise<boolean | undefined> => await deleteRecord<boolean>("/v1/list/" + id, throwError);

    return {
        loading,
        createList,
        retrieveList,
        retrieveAllLists,
        updateList,
        deleteList
    }
}