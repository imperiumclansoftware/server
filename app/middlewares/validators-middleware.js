const { validationResult, body } = require("express-validator");

const  validatorsMiddleware = {
    email: body("email").notEmpty().bail().trim().isEmail(),
    password: body("password").notEmpty().bail().isStrongPassword({
        minLength: 15,
        minNumbers:1,
        minUppercase:1,
        minLowercase:1,
        minSymbols: 1
    }),
    report: (req,res,next) => {
        const report = validationResult(req);
        if(report.isEmpty()) {
            return next();
        }

        return res.status(422).header('Content-Type',"application/problem+json").json({
            type: 'https://apiDocs.fr/errors',
            title: "problème de formation des données de la requête",
            errors: report.array(),
            code: 422,
        })
    }
}

module.exports = validatorsMiddleware;