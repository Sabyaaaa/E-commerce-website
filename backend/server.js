const app = require("./app");
const dotenv = require("dotenv");

//config
dotenv.config({ path: "backend/config/congig.env" })

app.listen(process.env.PORT, () => {
    console.log('Server is working on http://localhost:${process.env.PORT}')
})