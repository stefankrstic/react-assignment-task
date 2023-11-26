import { roles } from "@/data/roles";

export default function handler(req, res) {
    const role = Object.values(roles).find((role) => role.id === req.query.id);

    if (req.method === "GET") {
        res.status(200).json(role);
    } else if (req.method === "PATCH") {
        setTimeout(() => {
            const updatedRole = { ...role, ...req.body };
            roles[role.name] = updatedRole;
            return res.status(200).json(updatedRole);
        }, 2000);
    }
}
