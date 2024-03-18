
const connection = require('../db/db-connection');
const mime = require('mime');
var nodemailer = require('nodemailer');

const TeaEstateOwner_Validation = (req, res) => {

    connection.query('SELECT * FROM teaestateowner_details WHERE Email=? AND password=SHA2(?,256)', [req.body.Email, req.body.password],
        (err, result) => {
            if (err) {
                req.setEncoding({ err: err });
            } else {
                if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send({ message: "Wrong user name or password" })
                }
            }
        })
}

const TeaTransporter_Validation = (req, res) => {

    connection.query('SELECT * FROM drivers_details WHERE Email=? AND password=SHA2(?,256)', [req.body.Email, req.body.password],
        (err, result) => {
            if (err) {
                req.setEncoding({ err: err });
            } else {
                if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send({ message: "Wrong user name or password" })
                }
            }
        })
}

const Dispatch_TeaWeight = (req, res) => {

    connection.query(
        'INSERT INTO eastate_records (eatate_ID, Dispatch_Weight) VALUES (?, ?)', [req.body.estate_ID, req.body.Dispatch_Weight],
        (err, result) => {
            if (err) {
                console.error('Error occurred during insertion:', err);
                return res.status(500).send({ message: "Error occurred during insertion." });
            } else {
                return res.status(200).send({ message: "Data inserted successfully." });
            }
        }
    );
}


const Check_Emails = (req, res) => {
    const OTP = Math.floor(1000 + Math.random() * 9000);
    if (req.body.sub === "TeaEstateOwner") {
        console.log(req.body.sub);
        console.log(req.body.Email);
        connection.query('SELECT * FROM teaestateowner_details WHERE Email=?', [req.body.Email], (err, result) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).send({ message: 'Internal Server Error' });
            } else {
                if (result.length > 0) {
                    sendOTP(req.body.Email, OTP, res);
                } else {
                    res.status(404).send({ message: 'Email does not exist, Try again!' });
                }
            }
        });
    } else {
        console.log("teaTransporter");
        connection.query('SELECT * FROM drivers_details WHERE Email=?', [req.body.Email], (err, result) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).send({ message: 'Internal Server Error' });
            } else {
                if (result.length > 0) {
                    sendOTP(req.body.Email, OTP, res);
                } else {
                    res.status(404).send({ message: 'Email does not exist, Try again!' });
                }
            }
        });
    }
};

const sendOTP = (email, OTP, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chamoth.20221293@iit.ac.lk',
            pass: 'vtyk cvqv kycg yfxz'
        }
    });

    var mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'TeaSage Password Change OTP',
        text: `Dear EstateOwner,
        \r\n\r\nYou have requested to change your password for your TeaSage account. Please find your One-Time Password (OTP) below:
        \r\n\r\nOTP: ${OTP}\r\n\r\n
        This OTP is valid for a limited time and can only be used once.
         Do not share this OTP with anyone. If you did not request this change, 
         please ignore this email.\r\n\r\nThank you for using TeaSage.
         \r\n\r\nBest regards,\r\nTeaSage Team`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send({ message: 'Error sending OTP' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({ message: 'OTP sent successfully', OTP: `${OTP}` });
        }
    });
};



const Update_TeaEstateOwners = (req, res) => {
    const { newPassword, conPassword, Email, Validation } = req.body;
    console.log(Validation);
    // Assuming your table name is `teaestateowner_details`
    if (Validation === "TeaEstateOwner") {

        connection.query(

            'UPDATE teaestateowner_details SET password=?, Confirm_password=? WHERE Email=?',
            [newPassword, conPassword, Email],

            (err, result) => {
                if (err) {
                    console.error("Error updating record: ", err);
                    res.status(500).send({ message: "Error updating record" });
                } else {
                    console.log("Record updated successfully");
                    res.send(result); // You might want to adjust the response based on your requirements
                }
            }
        );

    } else {

        connection.query(

            'UPDATE drivers_details SET password=?, Confirm_password=? WHERE Email=?',
            [newPassword, conPassword, Email],

            (err, result) => {
                if (err) {
                    console.error("Error updating record: ", err);
                    res.status(500).send({ message: "Error updating record" });
                } else {
                    console.log("Record updated successfully");
                    res.send(result); // You might want to adjust the response based on your requirements
                }
            }
        );
    }

};

const GetTeastateOwnerDetails = (req, res) => {
    connection.query('SELECT * FROM teaestateowner_details', (err, rows) => {
        if (err) throw err
        res.send(rows)
    })
}




module.exports = { TeaEstateOwner_Validation, TeaTransporter_Validation, Dispatch_TeaWeight, Check_Emails, Update_TeaEstateOwners, GetTeastateOwnerDetails }