const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../connection/db_config");

const getBook = (req, res) => {
    connection.query("SELECT * FROM book", 
    (error, results) => {
        if(error)
            throw error;
        res.status(200).json(results);
    });
};

//ruta
app.route("/book")
.get(getBook);


const postBook = (req, res) => {
    const {title, author, genre, content, publishedDate, active} = req.body;
    connection.query("INSERT INTO book(title, author, genre, content, publishedDate, active) VALUES (?,?,?,?,?,?) ", 
    [title, author, genre, content, publishedDate, active],
    (error, results) => {
        if(error)
            throw error;
        res.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/book")
.post(postBook);


const delBook = (request, response) => {
    const id_book = request.params.id_book;
    connection.query("Delete from book where id_book = ?", 
    [id_book],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json({"Item eliminado":results.affectedRows});
    });
};

//ruta
app.route("/book/:id_book")
.delete(delBook);


module.exports = app;
