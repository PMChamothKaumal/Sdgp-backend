
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
    connection.query('SELECT * FROM teaestateowner_details WHERE Email=?', [req.body.Email],

        (err, result) => {
            //console.log(req.body.Email);
            if (err) {
                console.error('Error:', err);
                res.status(500).send({ message: 'Internal Server Error' });
            } else {
                if (result.length > 0) {
                    res.status(200).send(result);

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'chamoth.20221293@iit.ac.lk',
                            pass: 'vtyk cvqv kycg yfxz'
                        }
                    });

                    var mailOptions = {
                        from: 'chamoth.20221293@iit.ac.lk',
                        to: req.body.Email,
                        subject: 'TeaSage Password change OTP..',
                        text: 'Your OTP is: 1234'
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });


                } else {
                    res.status(404).send({ message: 'Email not found in the database' });
                }
            }
        });
};




module.exports = { TeaEstateOwner_Validation, TeaTransporter_Validation, Register_TeaEstateOwners, Check_Emails }