const { generate_name } = require('../src_js/generate_name.js');

const assert = require('assert');
 
describe('generate name', () => {
  it('generate name', () => {
    const foo = generate_name(Math.floor(Math.random() * 65536 * 65536));
    const bar = generate_name(Math.floor(Math.random() * 65536 * 65536));

    console.log(`    * ${foo}`);
    console.log(`    * ${bar}`);

    assert.ok(foo.length > 4);
    assert.ok(bar.length > 4);
  });
});
