# Secure Cloud-Based Question Paper Management System

A secure cloud computing and cloud security project that protects government examination question papers from unauthorized access, modification, and leakage throughout their lifecycle.

The system implements **Role-Based Access Control (RBAC)**, **AES-256 encryption**, **SHA-256 integrity verification**, **JWT authentication**, **Key Management System (KMS) simulation**, **audit logging**, and a **Time-Based Controlled Release Engine** that makes question papers accessible only at the scheduled examination time from an authorized examination center device.

---

# Problem Statement

Government examination question papers are highly sensitive documents that may be leaked through insider threats, unauthorized access, insecure storage, compromised systems, or communication vulnerabilities.

This project provides a **secure cloud-based question paper management system** that protects question papers throughout their complete lifecycle—from creation to secure delivery during the examination.

---

# Key Features

* Secure Login using JWT Authentication
* Role-Based Access Control (RBAC)
* Question Paper Creation
* Review Workflow
* Examination Authority Approval
* Calendar-Based Exam Scheduling
* AES-256 Encryption
* SHA-256 Integrity Verification
* Key Management System (KMS) Simulation
* Encrypted Question Paper Storage
* Security Audit Logging
* Time-Based Controlled Release
* Device ID Validation
* Authorized Paper Delivery
* Automatic Decryption at Exam Time
* Security Operations Center Dashboard

---

# System Workflow

The system follows a secure multi-role workflow.

## Question Paper Lifecycle

1. Question Setter creates a question paper.
2. The paper is encrypted using **AES-256**.
3. A **SHA-256 hash** is generated for integrity verification.
4. Reviewer reviews the paper and adds comments.
5. Examination Authority approves the paper.
6. The examination is scheduled using the calendar.
7. The paper remains locked until the scheduled examination time.
8. An authorized examination center device requests the paper.
9. The system validates the Device ID.
10. The paper is decrypted and released only after the scheduled time.
11. Every action is recorded in the Security Audit Logs.

---

# System Architecture

The project follows a layered cloud-security architecture.

## Workflow

Authenticate

↓

Authorize (RBAC)

↓

Create Question Paper

↓

Review Paper

↓

Approve Paper

↓

Schedule Examination

↓

Encrypt (AES-256)

↓

Generate SHA-256 Hash

↓

Store Encrypted Paper

↓

Audit Logging

↓

Time-Based Release Check

↓

Device Validation

↓

Decrypt Paper

↓

Examination Center Access

---

# Technologies Used

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
| API Testing           | PowerShell / REST |
| Version Control       | Git               |
| Repository            | GitHub            |

---

# Project Structure

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
│   ├── index.html
│   ├── setter.html
│   ├── reviewer.html
│   ├── authority.html
│   ├── security.html
│   └── exam-center.html
│
├── .env
├── package.json
├── README.md
└── screenshots (optional)
```

## Module Purpose

| Module      | Purpose                             |
| ----------- | ----------------------------------- |
| Controllers | Handle application business logic   |
| Routes      | Define API endpoints                |
| Middleware  | JWT authentication and RBAC         |
| Services    | Encryption and security operations  |
| Database    | SQLite database and initialization  |
| Uploads     | Stores encrypted question papers    |
| Keys        | AES encryption key (KMS simulation) |
| Logs        | Security and audit logs             |
| Frontend    | User portals for all roles          |

---

# User Roles

| Role                   | Responsibilities                       |
| ---------------------- | -------------------------------------- |
| Question Setter        | Create encrypted question papers       |
| Reviewer               | Review papers and add comments         |
| Examination Authority  | Approve and schedule examinations      |
| Security Administrator | Monitor audit logs                     |
| Examination Center     | Securely access papers after exam time |

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Secure-Cloud-Question-Paper-System.git
```

## 2. Open the Project

```bash
cd Secure-Cloud-Question-Paper-System
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env` file.

```env
PORT=5000
JWT_SECRET=your_secret_key
```

## 5. Start the Server

```bash
npm run dev
```

The application runs at:

```text
http://localhost:5000
```

---

# Login Credentials (Demo)

| Role                   | Email                  | Password      |
| ---------------------- | ---------------------- | ------------- |
| Question Setter        | `setter@example.com`   | `Password123` |
| Reviewer               | `reviewer@example.com` | `Password123` |
| Examination Authority  | `exam@example.com`     | `Password123` |
| Security Administrator | `security@example.com` | `Password123` |

---

# Portal Demonstration

## Login Portal

* Secure JWT Authentication
* Role-based dashboard redirection

## Question Setter Portal

* Create question papers
* AES-256 encryption
* SHA-256 integrity hash generation
* Automatic Paper ID generation

## Reviewer Portal

* View pending papers
* Review question papers
* Add review comments

## Examination Authority Portal

* Approve reviewed papers
* Schedule examinations using a calendar
* Automatic redirection to the Examination Center

## Examination Center

* Device ID validation
* Time-based controlled release
* Automatic AES-256 decryption
* Secure question paper display

## Security Operations Center

* View audit logs
* Monitor paper lifecycle
* Track security events

---

# Security Mechanisms

| Security Feature   | Purpose                                    |
| ------------------ | ------------------------------------------ |
| JWT                | User authentication                        |
| RBAC               | Restricts user permissions                 |
| AES-256            | Encrypts question papers                   |
| SHA-256            | Detects modifications                      |
| KMS Simulation     | Stores encryption keys separately          |
| Audit Logs         | Records every system action                |
| Time-Based Access  | Prevents early access                      |
| Device Validation  | Allows only authorized examination devices |
| Controlled Release | Releases papers only after scheduled time  |

---

# Sample API Requests

## Create Question Paper

```json
{
  "title": "Mathematics Model Paper",
  "content": "1. Find x.\n2. Solve the equation."
}
```

### Response

```json
{
  "message": "Question paper created successfully.",
  "paperId": 24,
  "hash": "SHA-256 Hash Value"
}
```

## Approve Paper

```json
{
  "message": "Paper approved successfully."
}
```

## Schedule Examination

```json
{
  "message": "Exam scheduled successfully."
}
```

## Early Access Attempt

```json
{
  "message": "Paper is locked until scheduled exam time."
}
```

## Authorized Delivery

```json
{
  "message": "Authorized delivery successful.",
  "device": "CENTER-001",
  "paper": "What is RAM?"
}
```

---

# Cloud Security Concepts

This project demonstrates several cloud computing and cloud security concepts, including:

* Secure cloud storage architecture
* Encryption before storage
* Separate key management (KMS simulation)
* Role-Based Access Control
* Secure authentication
* Audit logging
* Time-based access control
* Authorized device validation
* Controlled release mechanism
* Secure delivery architecture

---

# AWS Deployment Architecture

The current implementation runs locally using Node.js and SQLite. The deployment architecture is designed for AWS.

| AWS Service       | Purpose                          |
| ----------------- | -------------------------------- |
| Amazon EC2        | Hosts the Node.js application    |
| Amazon S3         | Stores encrypted question papers |
| AWS KMS           | Manages encryption keys          |
| Amazon CloudWatch | Monitoring and logging           |
| IAM               | Access control                   |
| HTTPS/TLS         | Secure communication             |

---

# Future Enhancements

* AWS KMS Integration
* Multi-Factor Authentication (OTP)
* Web Application Firewall (WAF)
* IDS/IPS Integration
* Data Loss Prevention (DLP)
* Real-Time Monitoring Dashboard
* Automatic Incident Response
* Email Notifications
* Cloud Backup Automation
* AWS RDS Migration

---

# Author

**Giridhar**

Computer Science and Engineering

Cloud Computing & Cloud Security Project

---

# License

This project is developed for **educational and academic purposes** as a Cloud Computing and Cloud Security mini-project.
