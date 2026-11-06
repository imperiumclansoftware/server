const { User } = require('../../database/models');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authCtrl = {
    async login(req, res, next) {

        const email = req.body.email;
        const password = req.body.password;

        
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            if (!user) {
                return next();
            }

            
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            
            console.log(isPasswordValid);
            if (!isPasswordValid) {
                return next();
            }

            

            const token = jwt.sign({
                userId: user.id
            }, process.env.JWT_SECRET, {
                issuer: "imperiumclan.fr", audience: "www.imperiumclan.fr", subject: "Shop IC", expiresIn: 15 * 60 * 1000
            });

            res.cookie("token",token,{
                maxAge: 15*60*1000,
                httpOnly: true,
                secure: false
            });

            return res.status(200).json({
                code: 200,
                message: "user authenticated",
                token,
            })
        }
        catch (err) {
            req.statusCode = 500
            return next();
        }
    }
}

module.exports = authCtrl;