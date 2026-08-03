'use strict';

global.window = {};
require('../data.js');
require('../data-patches.js');

const data = window.KFMH_DATA;
const errors = [];
const tags = new Set();

function assert(condition, message) {
  if (!condition) errors.push(message);
}

assert(data.transformers.length === 5, 'Expected 5 transformers.');
assert(data.mdps.length === 5, 'Expected 5 MDP panels.');

const expectedMpCounts = { MDP1: 4, MDP2: 8, MDP3: 14, MDP4: 5, MDP5: 6 };
const expectedConfirmedPpCounts = { MDP1: 4, MDP2: 28, MDP3: 64, MDP4: 0, MDP5: 0 };

for (const mdp of data.mdps) {
  assert(mdp.mps.length === expectedMpCounts[mdp.id], `${mdp.id}: unexpected MP count.`);
  const ppCount = mdp.mps.reduce((sum, mp) => sum + mp.pps.length, 0);
  assert(ppCount === expectedConfirmedPpCounts[mdp.id], `${mdp.id}: unexpected PP count.`);

  for (const mp of mdp.mps) {
    const expectedMpTag = `${mdp.id}-MP${mp.number}`;
    assert(mp.tag === expectedMpTag, `${mp.tag}: expected MP tag ${expectedMpTag}.`);

    mp.pps.forEach((pp, index) => {
      const expectedPpTag = `${mdp.id}.MP${mp.number}.PP${index + 1}`;
      assert(pp.tag === expectedPpTag, `${pp.tag}: expected PP tag ${expectedPpTag}.`);
      assert(!tags.has(pp.tag), `${pp.tag}: duplicate PP tag.`);
      tags.add(pp.tag);
    });
  }
}

const mdp2mp4 = data.mdps.find(x => x.id === 'MDP2').mps.find(x => x.number === 4);
assert(mdp2mp4.ratingA === 400, 'MDP2-MP4 breaker must be 400A.');

const mdp3mp11 = data.mdps.find(x => x.id === 'MDP3').mps.find(x => x.number === 11);
assert(mdp3mp11.pps.length === 4, 'MDP3-MP11 must contain 4 PP panels only.');

if (errors.length) {
  console.error('\nData validation failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}

console.log(`Validation passed: ${data.transformers.length} TR, ${data.mdps.length} MDP, ${tags.size} confirmed PP tags.`);
