import { roles } from "@/data/roles";

export default function handler(req, res) {
    const role = Object.values(roles).find((role) => role.id === Number(req.query.id));
    res.status(200).json(role);
}
