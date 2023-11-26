import { db } from "@/db";
import { v4 } from "uuid";

export default async function handler(req, res) {
    const users = (await db.get("users")) ?? [];

    if (req.method === "GET") {
        res.status(200).json(users);
    } else if (req.method === "POST") {
        setTimeout(async () => {
            const newUser = { ...req.body, id: v4() };
            await db.put("users", [...users, newUser]);
            res.status(200).json(newUser);
        }, 2000);
    }
}
