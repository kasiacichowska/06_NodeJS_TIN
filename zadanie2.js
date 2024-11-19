const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

        res.write('<!DOCTYPE html>');
        res.write('<html lang="pl">');
        res.write('<head><title>Formularz</title></head>');
        res.write('<body>');
        res.write('<h1>Wprowadź dane</h1>');
        res.write('<form action="/submit" method="POST">');
        res.write('<label for="inputField">Wartość:</label>');
        res.write('<input type="text" id="inputField" name="value">');
        res.write('<button type="submit">Wyślij</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            body = Buffer.concat(body).toString();

            const params = new URLSearchParams(body);
            const value = params.get('value');

            console.log("Otrzymana wartość:", decodeURIComponent(value));

            fs.writeFile('otrzymane_wartosci.txt', `${decodeURIComponent(value)}\n`, (err) => {
                if (err) {
                    console.error("Błąd zapisu do pliku:", err);
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write('<h1>Wystąpił błąd przy zapisywaniu danych.</h1>');
                    return res.end();
                }

                res.writeHead(302, {
                    'Location': '/'
                });
                res.end();
            });
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<h1>404 - Nie znaleziono strony</h1>');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Serwer uruchomiony na http://localhost:3000');
});
