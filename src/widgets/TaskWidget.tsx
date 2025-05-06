import { Box, Card, Chip, Typography } from "@mui/material";
import { Task } from "../models/Task";
import { PieChart } from "./PieChart";
import CheckBoxOutlineIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface WidgetProps {
    task: Task;
    selectTask: (task: Task) => void;
    markComplete: (task: Task) => void;
}

const TaskWidget = ({ task, selectTask, markComplete }: WidgetProps) => {
    return (
        <Card
            sx={{
                width: "90%",
                mx: "auto",
                mb: 1,
                p: 1,
            }}
            elevation={3}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "gray",
                    }}
                >
                    <span style={{ cursor: "pointer" }}>
                        {task.completion >= 100 ? (
                            <CheckBoxIcon onClick={() => markComplete(task)} />
                        ) : (
                            <CheckBoxOutlineIcon
                                onClick={() => markComplete(task)}
                            />
                        )}
                    </span>
                    <Typography
                        variant="body1"
                        sx={{
                            ml: 1,
                            textDecoration:
                                task.completion >= 100
                                    ? "line-through"
                                    : "none",
                            cursor: "pointer",
                            color: task.completion >= 100 ? "gray" : "black",
                        }}
                        onClick={() => (task.id ? selectTask(task) : null)}
                    >
                        {task.title}
                    </Typography>
                </Box>
                <PieChart value={task.completion} size={30} />
            </Box>
            {task.description && (
                <Typography variant="body2" color="textSecondary">
                    {task.description}
                </Typography>
            )}
            {task.tags &&
                task.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" sx={{ ml: 1 }} />
                ))}
        </Card>
    );
};

export default TaskWidget;
