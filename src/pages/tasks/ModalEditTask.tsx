import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { DefaultTask, Task } from "../../models/Task";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Jwt } from "../../models/Jwt";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    updateTask: (task: Task) => void;
    task?: Task;
    token: Jwt;
}

const ModalEditTask = ({
    open,
    onClose,
    updateTask,
    task,
    token,
}: ModalProps) => {
    const { t } = useTranslation();
    const [workingTask, setWorkingTask] = useState<Task>(task ?? DefaultTask);
    const [addTag, setAddTag] = useState<boolean>(false);
    const [newTag, setNewTag] = useState<string>("");
    const [addHistory, setAddHistory] = useState<string>("");

    useEffect(() => {
        setWorkingTask(task ?? DefaultTask);
    }, [task]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            <DialogTitle id="form-dialog-title">
                {t("modal:editTask.title")}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={t("modal:editTask.task.title")}
                            type="text"
                            fullWidth
                            value={workingTask.title}
                            onChange={(e) =>
                                setWorkingTask({
                                    ...workingTask,
                                    title: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            multiline
                            rows={4}
                            margin="dense"
                            id="description"
                            label={t("modal:editTask.task.description")}
                            type="text"
                            fullWidth
                            value={workingTask.description ?? ""}
                            onChange={(e) =>
                                setWorkingTask({
                                    ...workingTask,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid size={12}>
                        {(workingTask?.tags ?? []).map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                onDelete={() => {
                                    setWorkingTask({
                                        ...workingTask,
                                        tags: (workingTask.tags ?? []).filter(
                                            (t) => t !== tag
                                        ),
                                    });
                                }}
                                sx={{ mr: 1 }}
                            />
                        ))}
                        {!addTag && (
                            <Chip
                                label={t("modal:editTask.task.addTag")}
                                color="primary"
                                onClick={() => setAddTag(true)}
                                icon={<AddIcon />}
                                sx={{ mr: 1 }}
                            />
                        )}
                        {addTag && (
                            <TextField
                                margin="dense"
                                id="name"
                                label={t("modal:editTask.task.newTag")}
                                type="text"
                                fullWidth
                                variant="standard"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onBlur={() => {
                                    if (newTag.length > 0)
                                        setWorkingTask({
                                            ...workingTask,
                                            tags: [
                                                ...(workingTask.tags ?? []),
                                                newTag,
                                            ],
                                        });
                                    setAddTag(false);
                                    setNewTag("");
                                }}
                            />
                        )}
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="body1" fontWeight="bold">
                            {t("modal:editTask.task.history")}
                        </Typography>
                        {(workingTask.history ?? []).map((history, index) => (
                            <Box key={index}>
                                <Typography variant="body2">
                                    <strong>
                                        {new Date(history.at).toLocaleString()}
                                    </strong>
                                    {" ["}
                                    {history.user_id}
                                    {"]: "}
                                    {history.message}
                                </Typography>
                            </Box>
                        ))}
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            margin="dense"
                            id="name"
                            label={t("modal:editTask.task.addHistory")}
                            type="text"
                            fullWidth
                            value={addHistory}
                            onChange={(e) => setAddHistory(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    setWorkingTask({
                                        ...workingTask,
                                        history: [
                                            ...((workingTask.history ??
                                                []) as any),
                                            {
                                                at: new Date().toISOString(),
                                                user_id: token.id,
                                                message: addHistory,
                                            },
                                        ],
                                    });
                                    setAddHistory("");
                                }
                            }}
                        />
                    </Grid>
                    <Grid size={12}></Grid>
                    <Grid
                        size={12}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button
                            onClick={() => {
                                onClose();
                                setWorkingTask(DefaultTask);
                            }}
                            sx={{ mr: 1 }}
                        >
                            {t("cancel")}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                onClose();
                                updateTask(workingTask);
                            }}
                        >
                            {t("submit")}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ModalEditTask;
