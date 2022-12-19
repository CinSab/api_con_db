const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./dataccess/bookDB'));
app.use(require('./dataccess/userDB'));

app.listen(process.env.PORT||8000,() => {
    console.log("Servidor corriendo en el puerto 8000");
});

module.exports = app;