import { db } from "@/db";
import { v4 } from "uuid";

export default async function handler(req, res) {
    const users = (await db.get("users")) ?? [];

    if (req.method === "GET") {
        const roles = (await db.get("roles")) ?? [];
        const usersWithRoles = users.map((user) => ({ ...user, role: roles.find((role) => role.id === user.role) }));
        res.status(200).json(usersWithRoles);
    } else if (req.method === "POST") {
        setTimeout(async () => {
            const newUser = { ...req.body, id: v4(), createdAt: new Date().toISOString() };
            await db.put("users", [...users, newUser]);
            res.status(200).json(newUser);
        }, 2000);
    }
}
