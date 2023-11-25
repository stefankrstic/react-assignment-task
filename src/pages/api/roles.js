const roles = {
    Developer: {
        id: 1,
        name: "Developer",
        description: "Responsible for coding, designing, and maintaining software applications.",
    },
    Manager: {
        id: 2,
        name: "Manager",
        description: "Oversees a team or department, responsible for planning, directing, and coordinating operations.",
    },
    Sales: {
        id: 3,
        name: "Sales",
        description:
            "Engages in selling products or services, cultivating relationships with clients, and meeting sales targets.",
    },
};

export default function handler(req, res) {
    res.status(200).json(roles);
}
