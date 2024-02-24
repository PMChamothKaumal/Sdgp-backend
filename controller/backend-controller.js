
const connection = require('../db/db-connection');
const mime = require('mime');

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




module.exports = { TeaEstateOwner_Validation, TeaTransporter_Validation, Register_TeaEstateOwners }