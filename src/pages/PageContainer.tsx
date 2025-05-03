import { useCallback, useState } from "react";
import ModalError from "./ModalError";
import { pageRegistry } from "./pageRegistry";
import { jwtDecode } from "jwt-decode";
import { DefaultJwt, Jwt } from "../models/Jwt";

interface PageProps {
    api: string;
    page: string;
}

const PageContainer = ({ api, page }: PageProps) => {
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("Unknown error");
    const [code, setCode] = useState<number>(999);
    const [translate, setTranslate] = useState<boolean>(true);

    const decodedToken =
        localStorage.getItem("token")?.split(".").length === 3
            ? (jwtDecode(localStorage.getItem("token") ?? "") as Jwt)
            : DefaultJwt;

    const generatePage = () => {
        return pageRegistry(api, handleError, decodedToken ?? DefaultJwt).find(
            (p) => p.name === page
        );
    };

    const handleError = useCallback(
        (code: number, message: string, translate?: boolean) => {
            setErrorMessage(message);
            setCode(code);
            setTranslate(translate ?? true);
            setShowError(true);
        },
        []
    );

    return (
        <>
            {generatePage()?.return}

            <ModalError
                open={showError}
                message={errorMessage}
                code={code}
                translate={translate}
                onClose={() => setShowError(false)}
            />
        </>
    );
};

export default PageContainer;
