import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    addTask: (taskString: string) => void;
}

const countTags = (text: string) => {
    const out = [];
    const brokenText = text.split(" ");
    for (const word of brokenText) {
        if (word.startsWith("#")) {
            out.push(word);
        }
    }
    return out;
};

const ModalNewTask = ({ open, onClose, addTask }: ModalProps) => {
    const { t } = useTranslation();
    const [workingString, setWorkingString] = useState<string>("");

    return (
        <Dialog fullWidth open={open} onClose={onClose}>
            <DialogTitle>{t("modal:newTask.title")}</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onClose();
                        setWorkingString("");
                        addTask(workingString);
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label={t("modal:newTask.task")}
                                fullWidth
                                value={workingString}
                                onChange={(e) =>
                                    setWorkingString(e.target.value)
                                }
                            />
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="body2" color="textSecondary">
                                {t("modal:newTask.counted")}{" "}
                                {countTags(workingString).length}{" "}
                                {t("modal:newTask.tags")}:{" "}
                                {countTags(workingString).map((tag, index) => (
                                    <span key={index}>{tag} </span>
                                ))}
                            </Typography>
                        </Grid>
                        <Grid
                            size={12}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <Button
                                onClick={() => {
                                    setWorkingString("");
                                    onClose();
                                }}
                                sx={{ mr: 1 }}
                            >
                                {t("cancel")}
                            </Button>
                            <Button variant="contained" type="submit">
                                {t("submit")}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ModalNewTask;
