const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


//config
dotenv.config({ path: "backend/config/config.env" })

//connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});

//Unhandled Promise Exception (what if there is a error in the db_path link)
process.on("unhandledRejection", (err) => {

    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});