import { db } from "@/db";

export default async function handler(req, res) {
    const users = (await db.get("users")) ?? [];
    const user = users.find((user) => user.id === req.query.id);

    if (req.method === "GET") {
        res.status(200).json(user);
    } else if (req.method === "PATCH") {
        setTimeout(async () => {
            const updatedUser = { ...user, ...req.body };
            await db.put(
                "users",
                users.map((user) => {
                    return user.id === updatedUser.id ? updatedUser : user;
                }),
            );
            return res.status(200).json(updatedUser);
        }, 2000);
    }
}
