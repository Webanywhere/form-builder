var connect = require('connect');
connect.createServer(
    connect.static(__dirname, { maxAge: 1})
).listen(8080);
console.log("Static file server running at\n  => http://localhost:8080\nCTRL + C to shutdown");
