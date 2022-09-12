/* eslint-disable */

const yargs       = require('yargs');
const browserify  = require('browserify');
const browser     = require('browser-run');
const str         = require('string-to-stream');

const { writeFileSync } = require('fs');

const generation  = yargs.argv.generation || 2;
const name        = yargs.argv.name|| 'sample';

function write_data(json) {
  const data  = JSON.parse(json);

  const song  = JSON.stringify(data.song, null, '  ');
  const bytes = new Uint8Array(data.bytes.length);

  for (let i = 0; i < bytes.length; i++)
    bytes[i] = data.bytes[i];

  writeFileSync(`${name}.json`, song);
  writeFileSync(`${name}.wav`, bytes, 'binary');
}

let json = '';

browserify('./src-js/render_emulate.js')
  .exclude('in')
  .require(str(`module.exports = { in_generation: ${generation} };`), { file: 'in.js', expose: 'in' })
  .bundle()
  .pipe(browser({
    static: './static/files'
  }))
  .on('data', (data) => {
    json += data;

    if (data.includes('\n\n')) {
      write_data(json);
      process.exit(0);
    }
  });
