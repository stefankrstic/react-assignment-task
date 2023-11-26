import { db } from "@/db";

export default async function handler(req, res) {
    const roles = (await db.get("roles")) ?? [];
    const role = roles.find((role) => role.id === req.query.id);

    if (req.method === "GET") {
        res.status(200).json(role);
    } else if (req.method === "PATCH") {
        setTimeout(async () => {
            const updatedRole = { ...role, ...req.body };
            await db.put(
                "roles",
                roles.map((role) => {
                    return role.id === updatedRole.id ? updatedRole : role;
                }),
            );
            return res.status(200).json(updatedRole);
        }, 2000);
    }
}
