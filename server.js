const express = require("express");
const swaggerUi = require("swagger-ui-express");
const createError = require("http-errors");
const connectDB = require("./db");
const swaggerSpec = require("./docs");
require("dotenv").config();

const app = express();

connectDB();

const bookRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customCss: ".swagger-ui .topbar { display: none }",
    })
);
app.use("/api", bookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: err.stack,
    });
});

app.listen((port = process.env.PORT || 3000), () => {
    console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
