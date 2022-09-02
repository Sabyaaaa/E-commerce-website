const app = require("./app");
const dotenv = require("dotenv");


//config
dotenv.config({ path: "backend/config/congig.env" })






// app.listen(process.env.PORT, () => {
//     console.log('Server is working on http://localhost:${process.env.PORT}')
// })
app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});