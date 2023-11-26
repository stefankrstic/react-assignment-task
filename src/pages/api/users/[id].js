import { db } from "@/db";

export default async function handler(req, res) {
    const users = (await db.get("users")) ?? [];
    const user = users.find((user) => user.id === req.query.id);

    // Endpoint for getting a user by ID
    if (req.method === "GET") {
        res.status(200).json(user);

        return;
    }

    // Endpoint for updating a user
    if (req.method === "PATCH") {
        setTimeout(async () => {
            const updatedUser = { ...user, ...req.body };

            // Persist the changes to DB
            await db.put(
                "users",
                users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
            );

            res.status(200).json(updatedUser);
        }, 2000);

        return;
    }

    res.status(404).json({ error: "Not found" });
}
