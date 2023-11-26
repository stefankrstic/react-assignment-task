import { db } from "@/db";
import { v4 } from "uuid";

export default async function handler(req, res) {
    const roles = (await db.get("roles")) ?? [];

    if (req.method === "GET") {
        res.status(200).json(roles);
    } else if (req.method === "POST") {
        setTimeout(async () => {
            const newRole = { ...req.body, id: v4() };
            await db.put("roles", [...roles, newRole]);
            res.status(200).json(newRole);
        }, 2000);
    }
}
