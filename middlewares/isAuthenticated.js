const admin = require("../configs/firebaseAdmin");
const User = require("../models/userData");

// authenticate user based on firebase token
// attach with each request
const isAuthenticated = async (req, res, next) => {
    const authToken = req.headers.authorization.split(" ")[1];

    try{
        const decodedToken = await admin.auth().verifyIdToken(authToken);
        if (!decodedToken.email_verified) 
            throw new Error("Email not verified");
        const user = await User.find({userId : decodedToken.uid});
        if (!user) 
            return res.status(500).send("User missing from DB");
        if (!user.profileComplete) 
            throw new Error("Profile not complete");
        if (user.disabled) 
            throw new Error("User disabled");
        req.user = user;
        return next();
    }
    catch(error){
        console.log(error.message);
        return res.status(401).send(error.message);
    }
}

// to print the decoded token value
const decodedToken = async (authToken) => {
    const tokenValue = await admin.auth().verifyIdToken(authToken);
    console.log(JSON.stringify(tokenValue));
}

// isAuthenticated({headers : {authorization : "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjU4ODI0YTI2ZjFlY2Q1NjEyN2U4OWY1YzkwYTg4MDYxMTJhYmU5OWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVkaWNhbHJlY29yZG1hbmFnZW1lbnQtM2I3YzQiLCJhdWQiOiJtZWRpY2FscmVjb3JkbWFuYWdlbWVudC0zYjdjNCIsImF1dGhfdGltZSI6MTY3ODYyMjE1NywidXNlcl9pZCI6Ik1pQVhJcUhTQzVhOVpNQXhQd1JQQmxqdzdYSTIiLCJzdWIiOiJNaUFYSXFIU0M1YTlaTUF4UHdSUEJsanc3WEkyIiwiaWF0IjoxNjc4NjIyMTU3LCJleHAiOjE2Nzg2MjU3NTcsImVtYWlsIjoic2hhc2hhbmsuay5jaGF1ZGhhcnlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNoYXNoYW5rLmsuY2hhdWRoYXJ5QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.vndtKj8jZqECK_tv7pE1tvp035gNVu6gtrI5AWnd8s5_6efiRMRvwjrP1pyd_zohd5ga5VZOPc5wb3sxYxrqAf1D5gNW1GLVr9hcLl4gnc8gAKkgK9kNIGyRXWGwrA30fdpH4z7xT-Pnf0hBl0slaZYJliY1eGvIkT1LSBDSlJ0xfraiGdOMuJRhwdNpWotWJlWtUoRdT7OeXVUjBHgemqst3XmyqoQ3s3N-nCf0JOe3WkJF_uOYEW-6hkmYV7vYA8vYq4HhGibIQX9rNUxUEfZ8hGBNO_nFYCVhwvaIjZiL_NKmrsnZRksRjW0lUKw1Bu2YCDQ6HsZY7ZySF-kYRQ"}}, {}, () => console.log("next"))

module.exports = isAuthenticated;