const { v4 } = require("uuid");
const { faker } = require("@faker-js/faker");
const { open } = require("lmdb");

const db = open({ path: "db" });

// Roles
const roles = [];

for (let i = 0; i < 10; i++) {
    roles.push({
        id: v4(),
        name: faker.person.jobTitle().substring(0, 16),
        description: faker.person.jobDescriptor().substring(0, 50),
    });
}

db.put("roles", roles);

//Users
const users = [];

for (let i = 0; i < 25; i++) {
    roles.push({
        id: v4(),
        firstName: faker.person.firstName().substring(0, 20),
        lastName: faker.person.firstName().substring(0, 20),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(roles).id,
    });
}

db.put("users", users);
