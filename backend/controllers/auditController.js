const db = require("../database/db");

exports.getLogs = (req, res) => {

    db.all(
        `
        SELECT
            audit_logs.id,
            users.full_name,
            roles.role_name,
            audit_logs.action,
            audit_logs.timestamp
        FROM audit_logs
        LEFT JOIN users
            ON audit_logs.user_id = users.id
        LEFT JOIN roles
            ON users.role_id = roles.id
        ORDER BY audit_logs.timestamp DESC
        `,
        [],
        (err, rows) => {

            if (err)
                return res.status(500).json({
                    message: err.message
                });

            res.json(rows);
        }
    );
};