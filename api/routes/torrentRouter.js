const express = require('express');
const torrentRouter = express.Router();
const torrentStream = require('torrent-stream');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const mimeTypes = require('../utils/mimeTypes.js');

function getExtention(fileName) {
  return fileName.substring(fileName.lastIndexOf('.'));
}

function getMagnet(hash) {
  const magnet = 'magnet:?xt=urn:btih:';
  return magnet.concat(hash);
}

function isVideo(mime) {
  return mimeTypes[mime] !== undefined ? true : false;
}

function findVideoFile(engine) {
  let file;
  engine.files.forEach((current) => {
    let mime = getExtention(current.name);
    if (!isVideo(mime)) {
      console.log(mime + ' is not a valid movie file extention');
      return;
    } else if (file && current.length < file.length) {
      return;
    } else {
      file = current;
    }
  });
  return file;
}

function containsVideo(file, engine, res) {
  if (!file) {
    engine.removeAllListeners();
    engine.destroy();
    return res.send({ err: 'No video found on this torrent' });
  }
}

torrentRouter
  .get('/', async (req, res) => {

  const torrent_magnet = getMagnet(req.query.videoHash);
  var engine = torrentStream(torrent_magnet);

  engine.on('ready', function() {
    const file = findVideoFile(engine);
    containsVideo(file, engine, res);

    file.select();
    console.log('filename:', file.name)

    const pathFolder = `../torrents/${req.query.videoHash}`;
    // const { frSubFilePath, enSubFilePath } = await createSubFile(req.idImdb, req.torrent.hash);
    // req.torrent.data = {
    //   path: `${pathFolder}/${file.path}`,
    //   enSubFilePath,
    //   frSubFilePath,
    //   name: file.name,
    //   size: file.length,
    //   torrentDate: new Date(),
    // };

    const stream = file.createReadStream()

    const converter = ffmpeg()
      .input(stream)
      .outputOptions('-movflags frag_keyframe+empty_moov')
      .outputFormat('mp4')
      .output(res)
      .on('codecData', (codecData) => {
         console.log('fluent-ffmpeg Notice: CodecData:', codecData);
      })
      .on('start', (cmd) => { console.log('fluent-ffmpeg Notice: Started:', cmd); })
      .on('progress', (progress) => { console.log('fluent-ffmpeg Notice: Progress:', progress.timemark, 'converted'); })
      .on('error', (err, stdout, stderr) => {
         console.log('ffmpeg, file:', file.path, ' Error:', '\nErr:', err, '\nStdOut:', stdout, '\nStdErr:', stderr);
      });

    console.log(getExtention(file.name).substr(1));

    converter.inputFormat(getExtention(file.name).substr(1))
    .audioCodec('aac')
    .videoCodec('libx264')
    .run();

    res.pipe(converter);

    res.on('close', () => {
      converter.kill();
    })
  });
})

module.exports = torrentRouter;
