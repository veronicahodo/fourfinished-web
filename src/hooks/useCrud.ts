import axios, { isAxiosError } from "axios";
import { useState, useCallback } from "react";
import { getAuthHeaders } from "../utils/apiHelpers";

export const useCrud = <Input = any>(api: string) => {
    const [loading, setLoading] = useState<boolean>(false);

    const apiRequest = useCallback(
        async <T = Input>(
            method: "get" | "post" | "put" | "delete" | "patch",
            endpoint: string,
            data?: Partial<Input>,
            params?: any,
            throwError?: (code: number, message: string) => void
        ): Promise<T | undefined> => {
            setLoading(true);
            try {
                const config = {
                    headers: getAuthHeaders(),
                    params,
                };

                const url = `${api}${endpoint}`;
                const res =
                    method === "get" || method === "delete"
                        ? await axios[method](url, config)
                        : await axios[method](url, data, config);
                return res.data.data;
            } catch (error) {
                if (isAxiosError(error)) {
                    throwError?.(
                        error.response?.status ?? 500,
                        error.response?.data.error ?? "error:generalError"
                    );
                } else {
                    throwError?.(500, "error:generalError");
                }
            } finally {
                setLoading(false);
            }
        },
        [api]
    );

    const createRecord = useCallback(
        async <T = Input>(endpoint: string, data: Partial<Input>, throwError?: (code: number, message: string) => void): Promise<T | undefined> => {
            return await apiRequest<T>("post", endpoint, data, undefined, throwError);
        },
        [apiRequest]
    );

    const retrieveRecord = useCallback(
        async <T = Input>(endpoint: string, params?: any, throwError?: (code: number, message: string) => void): Promise<T | undefined> => {
            return await apiRequest<T>("get", endpoint, undefined, params, throwError);
        },
        [apiRequest]
    );

    const updateRecord = useCallback(
        async <T = Input>(endpoint: string, data: Partial<Input>, throwError?: (code: number, message: string) => void): Promise<T | undefined> => {
            return await apiRequest<T>("put", endpoint, data, undefined, throwError);
        },
        [apiRequest]
    );

    const deleteRecord = useCallback(
        async <T = Input>(endpoint: string, throwError?: (code: number, message: string) => void): Promise<T | undefined> => {
            return await apiRequest<T>("delete", endpoint, undefined, undefined, throwError);
        },
        [apiRequest]
    );

    return {
        loading,
        createRecord,
        retrieveRecord,
        updateRecord,
        deleteRecord,
        apiRequest,
    };
};
