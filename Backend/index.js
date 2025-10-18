const express = require('express');
const app = express();
const { DBConnection } = require("./database/db.js");
const checkAuth = require("./middleware/checkAuth.js");
const userRoute = require("./routes/userRoute.js");
const problemRoute = require("./routes/problemRoute.js");
const cors = require("cors");


app.use(cors());


app.listen(3000, () => {
        console.log('Server running on port number 3000');
});

DBConnection();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRoute);

app.use('/problem', problemRoute);

app.use((error, req, res, next) => {
        if (!res.headerSent && error) {
                return res.status(error.code || 500).json({ message: error.message || 'An unknown error occured' });
        }
});

// app.use(checkAuth);    // this is used only after Registration and login or just after login 


