const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =========================
// REGISTER USER
// =========================
exports.register = async (req, res) => {
    try {
        const { full_name, email, password, role_id } = req.body;

        if (!full_name || !email || !password || !role_id) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO users (full_name, email, password, role_id)
             VALUES (?, ?, ?, ?)`,
            [full_name, email, hashedPassword, role_id],
            function (err) {
                if (err) {
                    return res.status(400).json({
                        message: err.message
                    });
                }

                res.status(201).json({
                    message: "User registered successfully.",
                    userId: this.lastID
                });
            }
        );

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// =========================
// LOGIN USER
// =========================
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.get(
        `SELECT users.*, roles.role_name
         FROM users
         JOIN roles
         ON users.role_id = roles.id
         WHERE users.email = ?`,
        [email],
        async (err, user) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (!user) {
                return res.status(401).json({
                    message: "Invalid credentials."
                });
            }

            const validPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!validPassword) {
                return res.status(401).json({
                    message: "Invalid credentials."
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role_name
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            );

            res.json({
                message: "Login successful.",
                token: token,
                role: user.role_name,
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email
                }
            });
        }
    );
};

