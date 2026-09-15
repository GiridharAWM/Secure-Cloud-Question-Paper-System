# Secure Cloud-Based Question Paper Management System

A secure cloud computing and cloud security project that protects government examination question papers from unauthorized access, modification, and leakage throughout their lifecycle.

The system uses **Role-Based Access Control (RBAC)**, **AES-256 encryption**, **SHA-256 integrity verification**, **JWT authentication**, **Key Management System (KMS) simulation**, **audit logging**, and a **Controlled Release Engine** that makes question papers accessible only at the scheduled examination time.

---

## Problem Statement

Government competitive examination question papers are highly sensitive documents and may be leaked through insider threats, unauthorized access, insecure storage, compromised systems, or communication vulnerabilities.

This project provides a **secure cloud-based question paper management system** that minimizes the possibility of unauthorized access and leakage before the scheduled examination.

---

## Key Features

* Secure Login using JWT Authentication
* Role-Based Access Control (RBAC)
* Question Paper Creation
* Review Workflow
* Approval Workflow
* AES-256 Encryption
* SHA-256 Integrity Verification
* KMS (Encryption Key Management Simulation)
* Encrypted Cloud Storage
* Audit Logging
* Controlled Release Engine
* Device Validation
* Authorized Delivery
* Local Decryption Simulation

---

## System Architecture

The system follows a layered cloud-security architecture.

**Workflow**

Authenticate
→ Authorize
→ Create
→ Review
→ Approve
→ Encrypt
→ Store
→ Monitor
→ Controlled Release
→ Deliver
→ Decrypt
→ Examination

---

## Technologies Used

| Category              | Technology        |
| --------------------- | ----------------- |
| Backend               | Node.js           |
| Framework             | Express.js        |
| Database              | SQLite3           |
| Authentication        | JWT               |
| Password Security     | bcrypt            |
| Encryption            | AES-256           |
| Integrity             | SHA-256           |
| Environment Variables | dotenv            |
| File Upload           | Multer            |
| API Testing           | PowerShell / REST |
| Version Control       | Git               |
| Repository            | GitHub            |

---

## Project Structure

```text
Secure-Cloud-Question-Paper-System
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── database
│   ├── uploads
│   ├── keys
│   ├── logs
│   └── server.js
│
├── frontend
│   ├── css
│   ├── js
│   └── images
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

### Module Purpose

* **Controllers** – Handle application logic.
* **Routes** – API endpoints.
* **Middleware** – Authentication and RBAC.
* **Services** – Encryption and security operations.
* **Database** – SQLite database and initialization.
* **Uploads** – Encrypted question papers.
* **Keys** – AES encryption key (KMS simulation).
* **Logs** – Security and audit logs.

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Secure-Cloud-Question-Paper-System.git
```

### 2. Open Project

```bash
cd Secure-Cloud-Question-Paper-System
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment

Create a `.env` file.

Example:

```env
PORT=5000
JWT_SECRET=your_secret_key
```

### 5. Start the Server

```bash
npm run dev
```

Server runs on:

```text
http://localhost:5000
```

---

## Workflow

### Question Setter

* Login
* Create question paper
* Paper encrypted using AES-256
* SHA-256 hash generated

### Reviewer

* Review paper
* Add comments
* Paper marked as Reviewed

### Examination Authority

* Approve paper
* Schedule examination time
* Paper remains Locked

### Controlled Release

* Access denied before exam time
* Authorized device required
* Paper released only at scheduled time

### Security Administrator

* View audit logs
* Monitor security activities

---

## Security Mechanisms

| Security Feature  | Purpose                             |
| ----------------- | ----------------------------------- |
| JWT               | User authentication                 |
| RBAC              | Restricts user permissions          |
| AES-256           | Encrypts question papers            |
| SHA-256           | Detects modifications               |
| KMS Simulation    | Stores encryption key separately    |
| Audit Logs        | Records every action                |
| Time-Based Access | Prevents early access               |
| Device Validation | Allows only authorized systems      |
| HTTPS/TLS         | Secure communication (architecture) |

---

## Sample Input

Create Question Paper

```json
{
  "title": "Mathematics Model Paper",
  "content": "1. Find x. 2. Solve the equation."
}
```

---

## Sample Output

Paper Created

```json
{
  "message": "Question paper created successfully.",
  "paperId": 1
}
```

Paper Approved

```json
{
  "message": "Paper approved successfully."
}
```

Early Release Attempt

```json
{
  "message": "Paper is locked until scheduled exam time."
}
```

Authorized Delivery

```json
{
  "message": "Authorized delivery successful.",
  "device": "CENTER-001"
}
```

---

## Cloud Security Features

The project incorporates cloud computing concepts by using:

* Encrypted cloud storage
* Separate key management
* Secure metadata storage
* Audit logging
* Monitoring support
* Backup and disaster recovery architecture
* Controlled release mechanism
* Secure authorized delivery

---

## Future Enhancements

* Real Cloud KMS integration
* Multi-Factor Authentication (OTP)
* WAF integration
* IDS/IPS integration
* DLP integration
* Real-time monitoring dashboard
* Automatic incident response

---

## Author

**Giridhar**

Computer Science and Engineering (Cloud Computing & Cloud Security Project)
