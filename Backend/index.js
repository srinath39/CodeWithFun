const express = require('express');
const app = express();
const { DBConnection } = require("./database/db.js");
const checkAuth = require("./middleware/checkAuth.js");
const userRoute = require("./routes/userRoute.js");

app.listen(3000, () => {
        console.log('Server running on port number 3000');
});

DBConnection();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRoute);

app.use(checkAuth);    // this is used only after Registration and login or just after login 


