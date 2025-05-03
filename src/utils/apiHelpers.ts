import axios from "axios";

export const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const handleError = (
    error: unknown,
    throwError: (code: number, message: string) => void
) => {
    if (axios.isAxiosError(error)) {
        throwError(
            error.response?.status ?? 500,
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Unknown error"
        );
    } else {
        throwError(500, "Unknown error");
    }
};