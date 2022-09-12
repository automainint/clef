const { generate_name } = require('../src_js/generate_name.js');

const assert = require('assert');
 
describe('generate name', () => {
  it('generate name', () => {
    const foo = generate_name();
    const bar = generate_name();

    console.log(`    * ${foo}`);
    console.log(`    * ${bar}`);

    assert.ok(foo.length > 4);
    assert.ok(bar.length > 4);
  });
});
