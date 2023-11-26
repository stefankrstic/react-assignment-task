import { db } from "@/db";

export default async function handler(req, res) {
    const roles = (await db.get("roles")) ?? [];
    const role = roles.find((role) => role.id === req.query.id);

    // Endpoint for getting a role by ID
    if (req.method === "GET") {
        res.status(200).json(role);

        return;
    }

    // Endpoint for updating a role
    if (req.method === "PATCH") {
        // Using `setTimeout` to simulate long API operation
        setTimeout(async () => {
            const updatedRole = { ...role, ...req.body };

            // Persist the changes to DB
            await db.put(
                "roles",
                roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)),
            );

            res.status(200).json(updatedRole);
        }, 2000);

        return;
    }

    res.status(404).json({ error: "Not found" });
}
