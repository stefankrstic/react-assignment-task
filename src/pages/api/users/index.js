import { db } from "@/db";
import { v4 } from "uuid";

export default async function handler(req, res) {
    const users = (await db.get("users")) ?? [];

    // Endpoint for getting a list of users
    if (req.method === "GET") {
        const roles = (await db.get("roles")) ?? [];

        // Pre-populating role for each user
        const usersWithRoles = users.map((user) => ({ ...user, role: roles.find((role) => role.id === user.role) }));

        res.status(200).json(usersWithRoles);

        return;
    }

    // Endpoint for creating a user
    if (req.method === "POST") {
        setTimeout(async () => {
            const newUser = { ...req.body, id: v4(), createdAt: new Date().toISOString() };

            // Persist the changes to DB
            await db.put("users", [...users, newUser]);

            res.status(200).json(newUser);
        }, 2000);

        return;
    }

    res.status(404).json({ error: "Not found" });
}
