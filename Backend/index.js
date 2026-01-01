const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const { DBConnection } = require("./database/db.js");
const userRoute = require("./routes/userRoute.js");
const problemRoute = require("./routes/problemRoute.js");
const languageRoute = require("./routes/languageRoute.js");
const codeExecutionRoute = require("./routes/codeExecutionRoute.js");
const submissionRoute = require("./routes/submissionRoute.js");
const reviewRoute = require("./routes/reviewRoute.js");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.PORT, () => {
        console.log(`Server running on port number ${process.env.PORT}`);
});


DBConnection();

app.use(cors({
        origin: process.env.FRONTEND_URL_FOR_CORS, // your React app URL
        credentials: true, // allow cookies to be sent
}));


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());    // From frontend to Backend ( Filter in request url) 


app.use('/user', userRoute);

app.use('/problem', problemRoute);

app.use('/languages', languageRoute);

app.use('/code', codeExecutionRoute);

app.use('/submission', submissionRoute);

app.use('/review', reviewRoute)


app.use((error, req, res, next) => {
        if (!res.headerSent && error) {
                return res.status(error.code || 500).json({ message: error.message || 'An unknown error occured' });
        }
});



