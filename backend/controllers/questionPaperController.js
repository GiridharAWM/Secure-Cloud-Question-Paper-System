
const db = require("../database/db");
const fs = require("fs");
const path = require("path");

const {
    encryptText,
    decryptText,
    generateHash
} = require("../services/encryptionService");

// CREATE
exports.createPaper = (req, res) => {

    const { title, content } = req.body;

    const hash = generateHash(content);

    const encryptedData = encryptText(content);

    const fileName = `paper_${Date.now()}.enc`;

    fs.writeFileSync(
        path.join(__dirname, "../uploads", fileName),
        JSON.stringify(encryptedData)
    );

    db.run(
        `INSERT INTO question_papers
        (title, encrypted_file, hash, created_by)
        VALUES(?,?,?,?)`,
        [
            title,
            fileName,
            hash,
            req.user.id
        ],
        function(err){

            db.run(
                `INSERT INTO audit_logs(user_id,action)
                VALUES(?,?)`,
                [
                    req.user.id,
                    "Created Question Paper"
                ]
            );

            res.json({
                message:"Question paper created successfully.",
                paperId:this.lastID
            });

        }
    );

};

// REVIEW
exports.reviewPaper=(req,res)=>{

    const {paperId,comments}=req.body;

    db.run(
        `UPDATE question_papers
        SET status='Reviewed'
        WHERE id=?`,
        [paperId]
    );

    db.run(
        `INSERT INTO reviews
        (paper_id,reviewer_id,comments)
        VALUES(?,?,?)`,
        [
            paperId,
            req.user.id,
            comments
        ]
    );

    db.run(
        `INSERT INTO audit_logs(user_id,action)
        VALUES(?,?)`,
        [
            req.user.id,
            `Reviewed Paper #${paperId}`
        ]
    );

    res.json({
        message:"Paper reviewed successfully."
    });

};

// APPROVE
exports.approvePaper=(req,res)=>{

    const {paperId}=req.body;

    db.run(
        `UPDATE question_papers
        SET status='Approved',
            approved_by=?,
            release_status='Locked'
        WHERE id=?`,
        [
            req.user.id,
            paperId
        ]
    );

    db.run(
        `INSERT INTO audit_logs(user_id,action)
        VALUES(?,?)`,
        [
            req.user.id,
            `Approved Paper #${paperId}`
        ]
    );

    res.json({
        message:"Paper approved successfully."
    });

};

// SCHEDULE
exports.schedulePaper=(req,res)=>{

    const {paperId,exam_time}=req.body;

    db.run(
        `UPDATE question_papers
        SET exam_time=?,
            release_status='Locked'
        WHERE id=?`,
        [
            exam_time,
            paperId
        ]
    );

    db.run(
        `INSERT INTO audit_logs(user_id,action)
        VALUES(?,?)`,
        [
            req.user.id,
            `Scheduled Paper #${paperId}`
        ]
    );

    res.json({
        message:"Exam scheduled successfully."
    });

};

// AUTHORIZED DELIVERY
exports.releasePaper=(req,res)=>{

    const paperId=req.params.id;
    const deviceId=req.headers["device-id"];

    if(!deviceId){

        return res.status(403).json({
            message:"Device validation failed."
        });

    }

    db.get(
        `SELECT *
         FROM question_papers
         WHERE id=?`,
        [paperId],
        (err,paper)=>{

            if(!paper){

                return res.status(404).json({
                    message:"Paper not found."
                });

            }

            const now=new Date();
            const examTime=new Date(paper.exam_time);

            if(now<examTime){

                return res.status(403).json({
                    message:"Paper is locked until scheduled exam time."
                });

            }

            const encryptedFile=JSON.parse(

                fs.readFileSync(
                    path.join(
                        __dirname,
                        "../uploads",
                        paper.encrypted_file
                    ),
                    "utf8"
                )

            );

            const decrypted=decryptText(
                encryptedFile.encrypted,
                encryptedFile.iv
            );

            db.run(
                `UPDATE question_papers
                SET release_status='Released'
                WHERE id=?`,
                [paperId]
            );

            db.run(
                `INSERT INTO audit_logs(user_id,action)
                VALUES(?,?)`,
                [
                    req.user.id,
                    `Delivered Paper #${paperId}`
                ]
            );

            res.json({
                message:"Authorized delivery successful.",
                device:deviceId,
                paper:decrypted
            });

        }
    );

};

// VIEW PAPERS
exports.getAllPapers=(req,res)=>{

    db.all(
        `SELECT
            id,
            title,
            status,
            release_status,
            exam_time
         FROM question_papers`,
        [],
        (err,rows)=>{

            res.json(rows);

        }
    );

};