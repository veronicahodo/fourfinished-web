import { useEffect, useState } from "react";
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { DefaultList, List } from "../../models/List";
import { getIcon } from "../../utils/icons";
import { ListIcons } from "../../lists/ListIcons";
import { ListColors } from "../../lists/ListColors";
import { getColor } from "../../utils/color";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    addList: (list: List) => void;
    updateList: (list: List) => void;
    list: List | null;
}

const ModalEditList = ({
    open,
    onClose,
    addList,
    updateList,
    list = null,
}: ModalProps) => {
    const { t } = useTranslation();
    const [workingList, setWorkingList] = useState<List | null>(DefaultList);

    useEffect(() => {
        if (list) {
            setWorkingList(list);
        } else {
            setWorkingList(DefaultList);
        }
    }, [list]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {list?.id
                    ? t("modal:editList.title")
                    : t("modal:addList.title")}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={
                                list?.id
                                    ? t("modal:editList.label")
                                    : t("modal:addList.label")
                            }
                            type="text"
                            fullWidth
                            value={workingList?.title ?? ""}
                            onChange={(e) =>
                                setWorkingList({
                                    ...(workingList ?? DefaultList),
                                    title: e.target.value ?? "",
                                })
                            }
                        />
                    </Grid>
                    <Grid size={6}>
                        <Autocomplete
                            id="icon"
                            options={ListIcons}
                            getOptionLabel={(option) => t(option.label)}
                            value={
                                ListIcons.find(
                                    (icon) => icon.value === workingList?.icon
                                ) ?? null
                            }
                            onChange={(_, value) =>
                                setWorkingList({
                                    ...(workingList ?? DefaultList),
                                    icon: value?.value.toString() ?? "circle",
                                })
                            }
                            renderOption={(props, option) => {
                                const { key, ...other } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                        {...other}
                                    >
                                        {getIcon(option.value.toString())}
                                        {t(option.label)}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={
                                        list?.id
                                            ? t("modal:editList.icon")
                                            : t("modal:addList.icon")
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Autocomplete
                            id="color"
                            options={ListColors.sort((a, b) =>
                                a.label.localeCompare(b.label)
                            )}
                            getOptionLabel={(option) => t(option.label)}
                            value={
                                ListColors.find(
                                    (color) =>
                                        color.value === workingList?.color
                                ) ?? null
                            }
                            onChange={(_, value) =>
                                setWorkingList({
                                    ...(workingList ?? DefaultList),
                                    color: value?.value.toString() ?? "blue",
                                })
                            }
                            renderOption={(props, option) => {
                                const { key, ...other } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                        {...other}
                                    >
                                        <Box
                                            sx={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: 0.5,
                                                backgroundColor: getColor(
                                                    option.value.toString() ??
                                                        "blue"
                                                ),
                                            }}
                                        />
                                        {t(option.label)}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={
                                        list?.id
                                            ? t("modal:editList.color")
                                            : t("modal:addList.color")
                                    }
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setWorkingList(null);
                        onClose();
                    }}
                >
                    {t("cancel")}
                </Button>
                <Button
                    onClick={() => {
                        if (list?.id) updateList(workingList ?? DefaultList);
                        else addList(workingList ?? DefaultList);
                        setWorkingList(null);
                        onClose();
                    }}
                    autoFocus
                    variant="contained"
                >
                    {list?.id ? t("save") : t("add")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalEditList;
