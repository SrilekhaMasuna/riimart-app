const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/login", (req, res) => {
    console.log("🔐 Login request received:", req.body);

    const { email, password } = req.body;

    const users = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({
            message: "Login successful",
            token: "fake-jwt-token",
            username: user.username
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

router.post("/register", (req, res) => {
    console.log("📝 Register request received:", req.body);

    const { username, email, password } = req.body;

    const users = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { username, email, password };
    users.push(newUser);

    fs.writeFileSync("data/users.json", JSON.stringify(users, null, 2));

    res.json({ message: "Registration successful" });
});

module.exports = router;
