import { api } from "./api";

export const loginService = async (data) => {
    try {
        const response = await api.post('/auth/login', data);

        console.log("API RESPONSE:", response?.data);

        if (response?.data?.error) {
            return response.data;
        }

        const token =
            response?.data?.data?.token ||
            response?.data?.token ||
            response?.data?.accessToken;

        if (!token) {
            return {
                error: true,
                message: "Token not found in response"
            };
        }

        localStorage.setItem("token", token);

        let user = null;
        try {
            user = JSON.parse(atob(token.split(".")[1]));
            localStorage.setItem("auth", JSON.stringify(user));
        } catch (e) {
            console.log("Decode error:", e);
        }

        return {
            error: false,
            user
        };

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        return {
            error: true,
            message: "Server error"
        };
    }
};

export const getToken = () => {
    return localStorage.getItem("token");
};