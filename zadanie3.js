const express = require('express');
const path=require('path');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index',{text: "Kasia"});
})

app.post('/submit', (req, res) => {
    const imie = req.body['firstName'];
    const nazwisko = req.body['lastName'];
    const email = req.body['email'];

    res.render('index2',{textImie: imie, textNazwisko: nazwisko, textEmail: email});
})

app.listen(3000);
console.log("http://localhost:3000");