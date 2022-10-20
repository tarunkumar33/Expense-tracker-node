const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const User = require('../models/user');
const Forgotpassword = require('../models/forgotpassword');
const SENGRID_API_KEY = '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';

exports.forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            const id = uuid.v4();
            await user.createForgotpassword({ id, active: true });

            sgMail.setApiKey(SENGRID_API_KEY);

            const msg = {
                to: email, // Change to your recipient
                from: 'yj.rocks.2411@gmail.com', // Change to your verified sender
                subject: 'Reset Password for Expense tracker',
                text: 'Click on below resetpassword',
                html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
            }

            const response = await sgMail.send(msg);
            res.status(response[0].statusCode).json({ message: 'Link to reset password sent to your mail ', sucess: true, response })
        }
        else {
            res.status(404).json({ success: false, message: "User doesnt exist" });
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err, sucess: false });
    }
}

exports.resetpassword = async (req, res) => {
    try {
        const id = req.params.id;
        const forgotpasswordrequest = await Forgotpassword.findOne({ where: { id } });
        if (forgotpasswordrequest) {
            if (!forgotpasswordrequest.active) {
                res.status(404).json({ success: false, message: "Link got Expired" });
                return;
            }
            forgotpasswordrequest.update({ active: false });
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
            )
            res.end();
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: err, sucess: false });
    }
}

exports.updatepassword = async (req, res) => {
    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        const resetpasswordrequest = await Forgotpassword.findOne({ where: { id: resetpasswordid } });
        const user = await User.findOne({ where: { id: resetpasswordrequest.userId } });
        // console.log('userDetails', user)
        if (user) {
            //encrypt the password
            const saltRounds = 10;
            bcrypt.hash(newpassword, saltRounds, async function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    console.log(err);
                    throw new Error(err);
                }
                user.update({ password: hash });
                res.status(201).json({ message: 'Successfuly update the new password' });
            });
        } else {
            return res.status(404).json({ error: 'No user Exists', success: false })
        }
    } catch (error) {
        return res.status(403).json({ error, success: false })
    }
}