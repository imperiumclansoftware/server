const User = require("../../database/models/User");
const UserDto = require("../dto/UserDto");

const usersCtrl = {
  async create(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        req.statusCode = 409;
        req.message = `l'Email '${req.body.email}' déjà utilisé`;
        return next();
      }

      const userCreated = await User.create(UserDto.create(req.body));
      res.status(201).json({
        code: 201,
        message: "user created",
        loaction: "/users/" + userCreated.id,
      });
    } catch (err) {
      req.statusCode(500);
      req.message = "Erreur serveur lors de l'ajout de l'utilisateur";
      return next();
    }
  },
  async read(req, res, next) {
    const { userId } = req.token;
    try {
      const user = await User.findByPk(userId, {
        attributes: {
          exclude: ["password", "scopes"],
        },
      });
      return res.status(200).json({
        code: 200,
        message: "user found",
        user,
      });
    } catch (err) {
      console.log(err);
      req.statusCode = 500;
      req.message = "Erreur serveur lors de la récupération de l'utilisateur";
      return;
      next(err);
    }
  },
  async update(req, res, next) {
    try {
    } catch (err) {}
  },
  async delete(req, res, next) {
    try {
    } catch (err) {}
  },
};

module.exports = usersCtrl;
