const test = require('node:test');
const assert = require('node:assert/strict');

const {
  computeContainedScale,
  deriveScene05State,
  nextScene05Mode,
} = require('../site/presentation.js');

test('computeContainedScale preserves the 1440x900 desktop viewport without cropping', () => {
  assert.equal(computeContainedScale(720, 450), 0.5);
  assert.equal(computeContainedScale(900, 450), 0.5);
  assert.equal(computeContainedScale(720, 400), 4 / 9);
});

test('deriveScene05State requests the first load while keeping fallback visible until the iframe is ready', () => {
  assert.deepEqual(
    deriveScene05State({ active: true, mode: 'live', loaded: false }),
    { loaded: true, visible: false, interactive: false, tabIndex: -1 },
  );

  // Removing `loaded || active` would destroy the preserved-instance contract here.
  assert.deepEqual(
    deriveScene05State({ active: false, mode: 'live', loaded: true }),
    { loaded: true, visible: false, interactive: false, tabIndex: -1 },
  );
});

test('deriveScene05State switches to fallback without destroying the loaded iframe', () => {
  assert.deepEqual(
    deriveScene05State({ active: true, mode: 'fallback', loaded: true }),
    { loaded: true, visible: false, interactive: false, tabIndex: -1 },
  );
});

test('nextScene05Mode only handles the discreet L shortcut while scene 05 is active', () => {
  assert.equal(nextScene05Mode('live', 'l', true), 'fallback');
  assert.equal(nextScene05Mode('fallback', 'L', true), 'live');
  assert.equal(nextScene05Mode('live', 'l', false), 'live');
  assert.equal(nextScene05Mode('live', 'ArrowRight', true), 'live');
});
