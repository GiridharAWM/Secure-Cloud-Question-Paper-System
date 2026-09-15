
const db = require("./db");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS roles(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role_name TEXT UNIQUE NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role_id INTEGER,
            trusted_device INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(role_id) REFERENCES roles(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS question_papers(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            encrypted_file TEXT,
            hash TEXT,
            status TEXT DEFAULT 'Created',
            exam_time DATETIME,
            release_status TEXT DEFAULT 'Locked',
            created_by INTEGER,
            approved_by INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(created_by) REFERENCES users(id),
            FOREIGN KEY(approved_by) REFERENCES users(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS reviews(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            paper_id INTEGER,
            reviewer_id INTEGER,
            comments TEXT,
            reviewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(paper_id) REFERENCES question_papers(id),
            FOREIGN KEY(reviewer_id) REFERENCES users(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS audit_logs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            action TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            ip_address TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS security_events(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_type TEXT,
            description TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Add new columns for old databases safely
    db.run(`ALTER TABLE question_papers ADD COLUMN exam_time DATETIME`, () => {});
    db.run(`ALTER TABLE question_papers ADD COLUMN release_status TEXT DEFAULT 'Locked'`, () => {});

    const roles = [
        "Question Setter",
        "Reviewer",
        "Administrator",
        "Security Administrator",
        "Examination Authority"
    ];

    roles.forEach(role => {
        db.run(
            `INSERT OR IGNORE INTO roles(role_name) VALUES(?)`,
            [role]
        );
    });

    console.log("Database initialized successfully.");
});