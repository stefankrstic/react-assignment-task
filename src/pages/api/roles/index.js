import { db } from "@/db";
import { v4 } from "uuid";

export default async function handler(req, res) {
    const roles = (await db.get("roles")) ?? [];

    // Endpoint for getting a list of roles
    if (req.method === "GET") {
        res.status(200).json(roles);

        return;
    }

    // Endpoint for creating a role
    if (req.method === "POST") {
        setTimeout(async () => {
            const newRole = { ...req.body, id: v4() };

            // Persist the changes to DB
            await db.put("roles", [...roles, newRole]);

            res.status(200).json(newRole);
        }, 2000);

        return;
    }

    res.status(404).json({ error: "Not found" });
}
