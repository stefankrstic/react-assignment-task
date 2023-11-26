const { v4 } = require("uuid");
const { faker } = require("@faker-js/faker");
const { open } = require("lmdb");

const db = open({ path: "db" });

// Roles
const roles = [
    {
        id: v4(),
        name: "Developer",
        description: "Responsible for coding",
    },
    {
        id: v4(),
        name: "Manager",
        description: "Oversees a team or department",
    },
    {
        id: v4(),
        name: "Sales",
        description: "Engages in selling products or services",
    },
];

db.put("roles", roles);

//Users
const users = [];

for (let i = 0; i < 25; i++) {
    users.push({
        id: v4(),
        firstName: faker.person.firstName().substring(0, 20),
        lastName: faker.person.lastName().substring(0, 20),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(roles).id,
    });
}

db.put("users", users);
