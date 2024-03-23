
const connection = require('../db/db-connection');
const mime = require('mime');
var nodemailer = require('nodemailer');
const moment = require('moment-timezone');


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
    // Check if data already exists for the provided Tea_Estate_Id and current date
    connection.query(
        'SELECT * FROM dispatch_weight_records WHERE Tea_Estate_Id = ? AND Date_Column = CURDATE()',
        [req.body.estate_ID],
        (err, rows) => {
            if (err) {
                console.error('Error occurred during selection:', err);
                return res.status(500).send({ message: "Error occurred during data selection." });
            }

            // If there are rows returned, it means data already exists for the provided Tea_Estate_Id and current date
            if (rows.length > 0) {
                return res.status(400).send({ message: "Data already stored for the provided Tea Estate ID on the current date." });
            }

            // If no rows returned, proceed with the insertion
            connection.query(
                'INSERT INTO dispatch_weight_records (Tea_Estate_Id, Dispatch_weight, Date_Column) VALUES (?, ?, CURDATE())',
                [req.body.estate_ID, req.body.Dispatch_Weight],
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
            user: 'teasageofficial@gmail.com',
            pass: 'zshy aifl kepj llqm'
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

            'UPDATE teaestateowner_details SET password=SHA2(?,256), Confirm_password=? WHERE Email=?',
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

            'UPDATE drivers_details SET password=SHA2(?,256), Confirm_password=? WHERE Email=?',
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

const GetNotifications = (req, res) => {
    connection.query('SELECT * FROM owner_notifications', (err, rows) => {
        if (err) throw err
        res.send(rows)
    })
}


const NotfyTransporter = (req, res) => {
    // Get the current date in UTC+5:30 timezone
    const currentDateTime = moment().tz('Asia/Colombo').format('YYYY-MM-DD');

    // Check if data already exists for the provided Tea_Estate_Id and current date
    connection.query(
        'SELECT * FROM owner_notifications WHERE tea_state_id = ? AND Date_Column = ?',
        [req.body.tea_state_id, currentDateTime],
        (err, rows) => {
            if (err) {
                console.error('Error occurred during selection:', err);
                return res.status(500).send({ message: "Error occurred during data selection." });
            }

            // If there are rows returned, it means data already exists for the provided Tea_Estate_Id and current date
            if (rows.length > 0) {
                return res.status(400).send({ message: "Already Notified the Tea Transporter!" });
            }

            // If no rows returned, proceed with the insertion
            connection.query(
                'INSERT INTO owner_notifications (tea_state_id, notification, Date_Column) VALUES (?, ?, ?)',
                [req.body.tea_state_id, req.body.notification, currentDateTime],
                (err, result) => {
                    if (err) {
                        console.error('Error occurred during insertion:', err);
                        return res.status(500).send({ message: "Error occurred during insertion." });
                    } else {
                        return res.status(200).send({ message: "Successfully Notified the Transporter" });
                    }
                }
            );
        }
    );
}


const WeeklyReport = (req, res) => {
    connection.query(
        'SELECT * FROM eastate_records WHERE Email = ? ORDER BY ToDate DESC LIMIT 1',
        [req.body.Email],
        (err, rows) => {
            if (err) throw err
            res.send(rows)
        }
    );
};

const PastData = (req, res) => {
    connection.query(
        'SELECT income, ToDate, Dispatch_Weight, deduct_Weight  FROM eastate_records WHERE Email = ?',
        [req.body.Email],
        (err, rows) => {
            if (err) throw err
            res.send(rows)
        }
    );
};




module.exports = { TeaEstateOwner_Validation, PastData, TeaTransporter_Validation, Dispatch_TeaWeight, Check_Emails, Update_TeaEstateOwners, GetTeastateOwnerDetails, NotfyTransporter, GetNotifications, WeeklyReport }