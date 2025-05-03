import { BrowserRouter, Route, Routes } from "react-router";
import PageContainer from "./pages/PageContainer";

const api = import.meta.env.VITE_API_URL;

function App() {
    const createPath = (path: string, page: string) => {
        return (
            <Route
                path={path}
                element={<PageContainer page={page} api={api} />}
            />
        );
    };

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {createPath("/", "root")}
                    {createPath("/login", "login")}
                    {createPath("/tasks", "tasks")}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
