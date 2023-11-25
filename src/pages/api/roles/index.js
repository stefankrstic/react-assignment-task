import { roles } from "@/data/roles";

export default function handler(req, res) {
    res.status(200).json(roles);
}
