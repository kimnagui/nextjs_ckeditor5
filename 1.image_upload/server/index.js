const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const multer = require("multer");
const UploadToS3 = require("./upload-image");

app.prepare().then(() => {
    const server = express();

    // Custom Routing
    server.post("/api/editor/imageupload*", multer({ dest: "tmp/editor/images/" }).single("upload"), (req, res) => {
        console.log(req.file);
        UploadToS3(
            req.file,
            data => {
                res.json({ uploaded: true, url: data.Location, error: null });
            },
            err => {
                res.json({ uploaded: false, url: null, error: err });
            }
        );
    });
    /////////////////

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
