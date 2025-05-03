import { useEffect, useState } from "react";
import { useList } from "../../hooks/useList";
import { DefaultList, List } from "../../models/List";
import { Autocomplete, Box, TextField } from "@mui/material";
import ListOfLists from "../../widgets/ListOfLists";
import ListWidget from "../../widgets/ListWidget";
import ModalNewTask from "./ModalNewTask";
import { useTask } from "../../hooks/useTask";
import { DefaultTask, Task } from "../../models/Task";
import ModalEditTask from "./ModalEditTask";
import { Jwt } from "../../models/Jwt";
import ModalEditList from "./ModalEditList";
import { useTranslation } from "react-i18next";
import { getIcon } from "../../utils/icons";
import { getColor } from "../../utils/color";

interface PageProps {
    api: string;
    throwError: (code: number, message: string, translate?: boolean) => void;
    token: Jwt;
}

const PageTasks = ({ api, throwError, token }: PageProps) => {
    const { t } = useTranslation();
    const [lists, setLists] = useState<List[]>([]);
    const [selectedList, setSelectedList] = useState<List | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
    const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);
    const [showAddListModal, setShowAddListModal] = useState<boolean>(false);
    const [editList, setEditList] = useState<List | null>(null);

    const {
        loading: listLoading,
        createList,
        updateList,
        retrieveAllLists,
    } = useList(api, throwError);
    const {
        loading: taskLoading,
        createTask,
        updateTask,
        retrieveByParent,
    } = useTask(api, throwError);

    const addList = async (list: List) => {
        const addedList = await createList({
            ...DefaultList,
            owner_id: token.id,
            title: list.title,
            icon: list.icon ?? "circle",
            color: list.color ?? "blue",
        });
        if (addedList) {
            list.children = await retrieveByParent(list.id);
            setSelectedList(list);
            setLists((prevLists) => [...prevLists, list]);
        }
    };

    const listUpdate = async (list: List) => {
        const updatedList = await updateList(list);
        if (updatedList) {
            setLists((prevLists) =>
                prevLists.map((prevList) =>
                    prevList.id === list.id ? updatedList : prevList
                )
            );
            setSelectedList(updatedList);
        }
    };

    const markComplete = async (task: Task) => {
        // leave at double equals because MariaDB is garbage.
        const newCompletion = task.completion == 100 ? 0 : 100;

        const newTask = {
            ...task,
            completion: newCompletion,
        };

        const updatedTask = await updateTask(newTask);
        if (updatedTask) {
            setLists((prevLists) =>
                prevLists.map((list) =>
                    list.id === selectedList?.id
                        ? {
                              ...list,
                              children: list.children?.map((child) =>
                                  child.id === task.id ? updatedTask : child
                              ),
                          }
                        : list
                )
            );
            setSelectedList((prevList) =>
                prevList?.id === (selectedList?.id ?? "")
                    ? {
                          ...prevList,
                          children: prevList.children?.map((child) =>
                              child.id === task.id ? updatedTask : child
                          ),
                      }
                    : prevList
            );
            setSelectedTask(updatedTask);
        }
    };

    const handleAddTask = async (taskString: string) => {
        const outString = [];
        const tags = [];
        const brokenText = taskString.split(" ");
        for (const word of brokenText) {
            if (word.startsWith("#")) {
                if (word.length > 1) tags.push(word.slice(1));
                else outString.push("#");
            } else {
                outString.push(word);
            }
        }
        const task = await createTask({
            ...DefaultTask,
            parent_id: selectedList?.id ?? "",
            title: outString.join(" "),
            tags: tags,
        });
        if (task && selectedList) {
            setLists((prevLists) =>
                prevLists.map((list) =>
                    list.id === selectedList.id
                        ? {
                              ...list,
                              children: [...(list.children ?? []), task],
                          }
                        : list
                )
            );
            setSelectedList((prevList) =>
                prevList?.id === (selectedList?.id ?? "")
                    ? {
                          ...prevList,
                          id: prevList?.id ?? "",
                          title: prevList?.title ?? "",
                          icon: prevList?.icon ?? "",
                          color: prevList?.color ?? "",
                          owner_id: prevList?.owner_id ?? "",
                          children: [...(prevList?.children ?? []), task],
                      }
                    : prevList
            );
        }
    };

    useEffect(() => {
        const fetchLists = async () => {
            const incomingLists = await retrieveAllLists();
            if (incomingLists) setLists(incomingLists);
            setSelectedList(incomingLists?.[0] ?? null);
        };
        fetchLists();
    }, []);

    // TODO: add a thing to scale on resize
    const isLargeWindow = window.innerWidth > 1000;

    return (
        <>
            {!isLargeWindow && (
                <Autocomplete
                    id="lists"
                    options={lists}
                    getOptionLabel={(option) => option.title}
                    value={selectedList ?? null}
                    onChange={(_, value) => setSelectedList(value)}
                    renderOption={(props, option) => (
                        <Box
                            component="li"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                color: getColor(option.color),
                            }}
                            {...props}
                        >
                            <span>{getIcon(option.icon)}</span>
                            {option.title}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t("widget:listOfLists.selectList")}
                        />
                    )}
                />
            )}
            <Box sx={{ display: "flex", minHeight: "95vh" }}>
                {isLargeWindow && (
                    <Box sx={{ p: 3 }}>
                        <ListOfLists
                            lists={lists}
                            onSelect={setSelectedList}
                            addList={() => {
                                setEditList(null);
                                setShowAddListModal(true);
                            }}
                        />
                    </Box>
                )}

                <Box sx={{ p: 3 }}>
                    {selectedList && (
                        <ListWidget
                            key={selectedList.id}
                            api={api}
                            list={selectedList}
                            addTask={() => setShowNewTaskModal(true)}
                            throwError={throwError}
                            selectTask={(task) => {
                                setSelectedTask(task);
                                setShowEditTaskModal(true);
                            }}
                            markComplete={markComplete}
                        />
                    )}
                    {!selectedList && <>Show me titties.</>}
                </Box>
            </Box>

            <ModalNewTask
                open={showNewTaskModal}
                onClose={() => setShowNewTaskModal(false)}
                addTask={handleAddTask}
            />
            <ModalEditTask
                open={showEditTaskModal}
                onClose={() => setShowEditTaskModal(false)}
                task={selectedTask ?? DefaultTask}
                updateTask={() => {}}
                token={token}
            />
            <ModalEditList
                open={showAddListModal}
                onClose={() => setShowAddListModal(false)}
                addList={addList}
                list={editList}
                updateList={listUpdate}
            />
            {taskLoading && <></>}
            {listLoading && <></>}
        </>
    );
};

export default PageTasks;
