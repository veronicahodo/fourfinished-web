import { useCallback, useEffect, useState } from "react";
import { List } from "../models/List";
import { useList } from "../hooks/useList";
import { useTask } from "../hooks/useTask";
import { Task } from "../models/Task";
import { Box, Button, Card, Typography } from "@mui/material";
import { getColor } from "../utils/color";
import { getIcon } from "../utils/icons";
import { useTranslation } from "react-i18next";
import TaskWidget from "./TaskWidget";

interface WidgetProps {
    api: string;
    list: List;
    addTask: () => void;
    selectTask: (task: Task) => void;
    throwError: (code: number, message: string, translate?: boolean) => void;
    markComplete: (task: Task) => void;
}

const ListWidget = ({
    api,
    list,
    addTask,
    throwError,
    selectTask,
    markComplete,
}: WidgetProps) => {
    const { t } = useTranslation();
    const { loading: listLoading } = useList(api);
    const { loading: taskLoading, retrieveByParent } = useTask(api, throwError);
    const [loading, setLoading] = useState<boolean>(false);

    const [tasks, setTasks] = useState<Task[]>([]);

    const getChildren = useCallback(
        async (parentId: string, depth = 1): Promise<Task[]> => {
            if (depth > 10) return [];

            const children = (await retrieveByParent(parentId)) ?? [];

            const nestedChildren = await Promise.all(
                children.map((child) => getChildren(child.id, depth + 1))
            );

            // Flatten nested arrays and concatenate with direct children
            return [...children, ...nestedChildren.flat()];
        },
        [retrieveByParent]
    );

    const getTasks = useCallback(
        async (listId: string) => {
            const allTasks = await getChildren(listId);
            setTasks(allTasks);
        },
        [list]
    );

    useEffect(() => {
        setLoading(taskLoading || listLoading);
    }, [taskLoading, listLoading]);

    useEffect(() => {
        getTasks(list.id);
    }, [list, getTasks]);

    return (
        <Card sx={{ minWidth: 300, maxWidth: 900, p: 3 }}>
            <Box
                sx={{
                    backgroundColor: getColor(list.color),
                    color: "#fff",
                    p: 2,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 2,
                }}
            >
                <span>{getIcon(list.icon ?? "star")}</span>
                <Typography variant="h5" sx={{ ml: 1 }}>
                    {list.title}
                </Typography>
            </Box>
            {loading && <></>}
            {tasks.length > 0 &&
                tasks
                    .sort((a, b) => a.completion - b.completion)
                    .map((task) => (
                        <TaskWidget
                            key={task.id}
                            task={task}
                            selectTask={selectTask}
                            markComplete={markComplete}
                        />
                    ))}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => addTask()} variant="contained">
                    {t("widget:list.addTask")}
                </Button>
            </Box>
        </Card>
    );
};

export default ListWidget;
