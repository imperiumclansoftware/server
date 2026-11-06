const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  const verificationToken = jwt.verify(token, process.env.JWT_SECRET, {
    issuer: "imperiumclan.fr",
    audience: "www.imperiumclan.fr",
    subject: "Shop IC",
    algorithms: ["HS256"],
  });
  return verificationToken;
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const cookieToken = req.cookies["token"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        req.token = verifyToken(token);
        next("");
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  }

  if (cookieToken) {
    try {
      req.token = verifyToken(cookieToken);
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
    // return res
    //   .status(401)
    //   .type("application/problem+json")
    //   .json({
    //     title: "Autorization Manquante",
    //     details: "Vous devez être connecté pour accéder à cette ressource",
    //     status: 401,
    //     instance: req.originalUrl ?? "",
    //   });
  }

};

module.exports = authMiddleware;
