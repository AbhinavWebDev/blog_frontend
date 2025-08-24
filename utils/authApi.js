import { publicApi, privateApi } from "./api";

const authApi = {
    register: (data) => publicApi.post("/auth/register", data),

    login: (data) => publicApi.post("/auth/login", data),

    logout: () => publicApi.post("/auth/logout"),

    refresh: () => publicApi.post("/auth/refresh"),
};

export default authApi;
