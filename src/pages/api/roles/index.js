import { roles } from "@/data/roles";

export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json(roles);
    } else if (req.method === "POST") {
        // Simulate role creation in DB
        roles[req.body.name] = { id: Math.random(), ...req.body };
        return res.status(200).json(req.body);
    }
}
