import { ReactElement } from "react";

interface PageData {
    name: string;
    page: ReactElement;
    secure: boolean;
}

export const DefaultPageData: PageData = {
    name: "",
    page: <></>,
    secure: false,
};
