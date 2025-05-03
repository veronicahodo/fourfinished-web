import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useCrud } from "../../hooks/useCrud";

interface PageProps {
    api: string;
    throwError: (code: number, message: string, translate?: boolean) => void;
}

const PageLogin = ({ api, throwError }: PageProps) => {
    const { t } = useTranslation();
    const nav = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { loading, createRecord } = useCrud(api);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await createRecord<string>(
            "/v1/user/authenticate",
            {
                email,
                password,
            },
            throwError
        );
        if (res) {
            localStorage.setItem("token", res ?? "");
            nav("/tasks");
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: 600, mt: 5, mx: "auto" }}>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <Typography variant="h5">
                                    {t("login:login")}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label={t("login:email")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    required
                                    autoFocus
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label={t("login:password")}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    fullWidth
                                    required
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid
                                size={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button
                                    onClick={() => nav("/register")}
                                    variant="text"
                                    sx={{ mr: 1 }}
                                >
                                    {t("login:register")}
                                </Button>
                                <Button
                                    onClick={() => nav("/forgot-password")}
                                    variant="text"
                                    sx={{ mr: 1 }}
                                >
                                    {t("login:forgotPassword")}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                >
                                    {loading ? t("loading") : t("login:login")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default PageLogin;
