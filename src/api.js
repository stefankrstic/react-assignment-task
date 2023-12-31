import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

export async function getRoles() {
    const { data } = await api.get("/roles");
    return data;
}

export async function getRole(id) {
    const { data } = await api.get(`/roles/${id}`);
    return data;
}

export async function saveRole(role) {
    if (role.id) {
        const { data } = await api.patch(`/roles/${role.id}`, role);
        return data;
    }
    const { data } = await api.post("/roles", role);
    return data;
}

export async function updateRole(role) {
    const { data } = await api.patch(`/roles/${role.id}`, role);
    return data;
}

export async function getUsers() {
    const { data } = await api.get("/users");
    return data;
}

export async function getUser(id) {
    const { data } = await api.get(`/users/${id}`);
    return data;
}

export async function saveUser(user) {
    if (user.id) {
        const { data } = await api.patch(`/users/${user.id}`, user);
        return data;
    }
    const { data } = await api.post("/users", user);
    return data;
}
