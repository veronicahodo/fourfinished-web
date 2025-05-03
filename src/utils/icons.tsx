import StarIcon from "@mui/icons-material/Star";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { ReactElement } from "react";

const icons = {
    circle: CircleIcon,
    square: SquareIcon,
    star: StarIcon,
    clock: AccessTimeFilledIcon,
    pencil: EditIcon,
    heart: FavoriteIcon,
    person: PersonIcon,
};

export const getIcon = (icon: string): ReactElement => {
    const IconComponent =
        icons[icon.toLowerCase() as keyof typeof icons] ?? CircleIcon;
    return <IconComponent />;
};
