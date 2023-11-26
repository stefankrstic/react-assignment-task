import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

export async function getRoles() {
    const { data } = await api.get("/roles");
    return data;
}

export async function createRole(role) {
    const { data } = await api.post("/roles", role);
    return data;
}

export async function getUsers() {
    const { data } = await api.get("/users");
    return data;
}
