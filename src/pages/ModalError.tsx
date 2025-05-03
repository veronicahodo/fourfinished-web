import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ModalProps {
    code: number;
    message: string;
    open: boolean;
    onClose: () => void;
    translate?: boolean;
}

const ModalError = ({
    code,
    message,
    open,
    onClose,
    translate = true,
}: ModalProps) => {
    const { t } = useTranslation();
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{code}</DialogTitle>
            <DialogContent>
                <Alert severity="error" color="error">
                    {translate ? t(message) : message}
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    {t("close")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalError;
