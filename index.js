const fs = require('fs');
const EventEmitter = require('events').EventEmitter;

function readFile (filename, emitter) {
  fs.readFile(filename, 'utf8', function (err, raw) {
    if (err) { return emitter.emit('error', err); }

    try {
      emitter.emit('json', JSON.parse(raw));
    }
    catch (e) {
      emitter.emit('error', e);
    }
  });
}

module.exports = function (filename) {
  const watcher = fs.watch(filename, { persistant: true, recursive: false });
  const emitter = new EventEmitter();
  const read = readFile.bind(null, filename, emitter);

  watcher.on('change', read);
  read();

  return emitter;
};
