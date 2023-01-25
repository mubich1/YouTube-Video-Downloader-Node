const express = require('express');
const port = require('./config/environment/index');
const http = require('http');
const cors = require("cors");
const ytdl = require('ytdl-core');
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors(
    {
        origin: "*"
    }
));

app.post('/api/youtube/downloader', async function (req, res) {
    const url = req.body.url;
    const video = url.split("=");
    const videos = video[1].split('&');
    const videoID = videos[0];
    let info = await ytdl.getInfo(videoID);
    console.log(info, 'info');
    return res.status(200).send(info);
})

server.listen(port, () => {
    console.log(`Express server listening ${port}`);
});

module.exports = app