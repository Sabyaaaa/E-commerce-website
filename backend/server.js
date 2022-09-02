const app = require("./app");

app.listen(process.env.PORT, () => {
    console.log('Server is working on http://localhost:${process.env.PORT}')
})