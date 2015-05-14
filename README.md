watch-json
====

Module and cli that watches a json file and emits an object when it changes.

Module usage
----

`watch-json` expects a filename as an argument, and returns an `EventEmitter`. It emits a `json` event with the parsed object whenver the file changes.

If an error occurs (for example, if the source file contains invalid json) an `error` event is emitted. Handling this is optional, but remember that an unhandled `error` event will throw an exception.

```js
require('watch-json')(filename)
  .on('json', function (obj) {
    // do something with the object
  })
  .on('error', function (err) {
    // handle the error
  });
```

CLI Usage
----

`watch-json somefile.json`

Every time `somefile.json` changes its contents will be written to stdout, meaning that you can consider this an `ndjson` stream. This is useful for making a simple data source that you pipe into another app. Eg.

`watch-json somefile.json | other-app`

License
----

MIT
