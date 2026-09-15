
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const KEY_PATH = path.join(__dirname, "../keys/aes.key");

if (!fs.existsSync(KEY_PATH)) {
    fs.writeFileSync(KEY_PATH, crypto.randomBytes(32));
}

const KEY = fs.readFileSync(KEY_PATH);

// Encrypt
exports.encryptText = (text) => {

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        KEY,
        iv
    );

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return {
        encrypted,
        iv: iv.toString("hex")
    };
};

// Decrypt
exports.decryptText = (encrypted, iv) => {

    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        KEY,
        Buffer.from(iv, "hex")
    );

    let decrypted = decipher.update(
        encrypted,
        "hex",
        "utf8"
    );

    decrypted += decipher.final("utf8");

    return decrypted;
};

// SHA-256
exports.generateHash = (text) => {

    return crypto
        .createHash("sha256")
        .update(text)
        .digest("hex");
};
