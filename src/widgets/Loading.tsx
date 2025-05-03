import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

const Loading = () => {
    const { t } = useTranslation();
    return (
        <>
            <CircularProgress />
            {t("loading")}
        </>
    );
};

export default Loading;
