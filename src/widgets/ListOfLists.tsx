import { Box, Button, Card, Typography } from "@mui/material";
import { List } from "../models/List";
import { getColor } from "../utils/color";
import { getIcon } from "../utils/icons";
import { useTranslation } from "react-i18next";

interface WidgetProps {
    lists: List[];
    onSelect: (list: List) => void;
    addList: () => void;
}

const ListOfLists = ({ lists, onSelect, addList }: WidgetProps) => {
    const { t } = useTranslation();
    return (
        <Card sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ color: getColor("purple") }}>
                Lists
            </Typography>
            {lists
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((list) => (
                    <Box
                        key={list.id}
                        sx={{
                            ml: 3,
                            mb: 2,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={() => onSelect(list)}
                    >
                        <span style={{ color: getColor(list.color) }}>
                            {getIcon(list.icon ?? "star")}
                        </span>
                        <Typography variant="h6" sx={{ ml: 1 }}>
                            {list.title}
                        </Typography>
                    </Box>
                ))}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => addList()} variant="text">
                    {t("widget:listOfLists.addList")}
                </Button>
            </Box>
        </Card>
    );
};

export default ListOfLists;
