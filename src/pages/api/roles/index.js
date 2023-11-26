import { roles } from "@/data/roles";
import { v4 } from "uuid";

export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json(Object.values(roles));
    } else if (req.method === "POST") {
        setTimeout(() => {
            // Simulate role creation in DB
            const newRole = { ...req.body, id: v4() };
            roles[req.body.name] = newRole;
            return res.status(200).json(newRole);
        }, 2000);
    }
}
