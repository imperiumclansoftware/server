const User = require("../../database/models/User");
const UserDto = require("../dto/UserDto");

const usersCtrl = {
    async create(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            
            if(user) {
                req.statusCode = 409;
                req.message = `l'Email '${req.body.email}' déjà utilisé`
                return next();
            }

            const userCreated = await User.create(UserDto.create(req.body));
            res.status(201).json({
                code: 201,
                message: 'user created',
                loaction: '/users/' + userCreated.id
            })
         } catch (err) { 
            req.statusCode(500);
            req.message = "Erreur serveur lors de l'ajout de l'utilisateur"
            return next()
         }
    },
    async read(erq, res, next) {
        try { } catch (err) { }
    },
    async update(erq, res, next) {
        try { } catch (err) { }
    },
    async delete(erq, res, next) {
        try { } catch (err) { }
    }
}

module.exports = usersCtrl