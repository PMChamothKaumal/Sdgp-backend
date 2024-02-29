
const connection = require('../db/db-connection');
const mime = require('mime');
var nodemailer = require('nodemailer');

const TeaEstateOwner_Validation = (req, res) => {

    connection.query('SELECT * FROM teaestateowner_details WHERE username=? AND password=?', [req.body.username, req.body.password],
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

    connection.query('SELECT * FROM teaestateowner_details WHERE username=? AND password=?', [req.body.username, req.body.password],
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

const Register_TeaEstateOwners = (req, res) => {

    connection.query('INSERT INTO teaestateowner_details VALUES(?,?,?,?)', [req.body.username, req.body.TeaEstateId, req.body.password, req.body.confirm_password],
        (err, result) => {
            if (result) {
                res.send(result);
            } else {
                res.send({ message: "Enter correct details" })
            }
        })
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
        connection.query('SELECT * FROM teaeTransporters_details WHERE Email=?', [req.body.Email], (err, result) => {
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
        subject: 'TeaSage Password change OTP..',
        text: `Your OTP is: ${OTP}`
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

            'UPDATE teaestateowner_details SET password=?, confirm_password=? WHERE Email=?',
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

            'UPDATE teaTransporter_details SET password=?, confirm_password=? WHERE Email=?',
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




module.exports = { TeaEstateOwner_Validation, TeaTransporter_Validation, Register_TeaEstateOwners, Check_Emails, Update_TeaEstateOwners, GetTeastateOwnerDetails }