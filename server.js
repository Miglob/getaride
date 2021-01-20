/*const app = require('./index');

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});*/

const express = require("express");
const path = require("path");
const config = require("config");

const app = express();

// Body-parser Middleware
app.use(express.json());
// Use Routes
app.use('/api', require('./router/api'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));