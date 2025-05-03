export interface Jwt {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    iat: number;
    exp: number;
}

export const DefaultJwt: Jwt = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    iat: 0,
    exp: 0,
};
