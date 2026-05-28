import { jwtDecode } from "jwt-decode";
import { redirect, type LoaderFunctionArgs } from "react-router";
import { clearAuth } from "@react-lab/shared";

interface JwtPayload {
    exp: number;
}

const hasValidAccessToken = (): boolean => {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;

    try {
        const { exp } = jwtDecode<JwtPayload>(token);
        const now = Math.floor(Date.now() / 1000);
        return exp > now;
    } catch {
        clearAuth();
        return false;
    }
};

export const protectedLoader = ({ request }: LoaderFunctionArgs) => {
    if (hasValidAccessToken()) return null;

    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;
    const params = new URLSearchParams({ redirect: redirectTo });
    throw redirect(`/auth/login?${params}`);
};

export const publicOnlyLoader = () => {
    if (hasValidAccessToken()) {
        throw redirect("/");
    }
    return null;
};