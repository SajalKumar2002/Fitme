const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.sendStatus(404).send({ message: "Something went wrong, Please login again" });
            }
            req.body.userId = decoded.userId;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { authenticateJWT };
