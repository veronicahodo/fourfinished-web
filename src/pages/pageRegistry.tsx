import { Jwt } from "../models/Jwt";
import PageLogin from "./login/PageLogin";
import PageRoot from "./root/PageRoot";
import PageTasks from "./tasks/PageTasks";

export const pageRegistry = (
    api: string,
    throwError: (code: number, message: string, translate?: boolean) => void,
    decodedToken: Jwt
) => [
    { name: "root", return: <PageRoot />, secure: false },
    {
        name: "login",
        return: <PageLogin api={api} throwError={throwError} />,
        secure: false,
    },
    {
        name: "tasks",
        return: (
            <PageTasks api={api} throwError={throwError} token={decodedToken} />
        ),
        secure: true,
    },
];
