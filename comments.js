const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/comments') {
        // Read comments from a file
        fs.readFile('comments.txt', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/comments') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            // Save the comment to the file
            fs.appendFile('comments.txt', body + '\n', 'utf8', (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Internal Server Error');
                } else {
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Comment added successfully');
                }
            });
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
