const admin = require("../configs/firebaseAdmin");

// authenticate user based on firebase token
// attach with each request
const isAuthenticated = (req, res, next) => {
    const authToken = req.headers.authorization.split(" ")[1];
    admin.auth().verifyIdToken(authToken).then((decodedToken) => {
        // const uid = decodedToken.uid;
        req.user = decodedToken;
        return next();
    }).catch((error) => {
        // Handle error
        // deleting req.user to prevent access to protected routes
        delete req.user;
        return res.status(401).send("Unauthorized");
    });
}

module.exports = isAuthenticated;