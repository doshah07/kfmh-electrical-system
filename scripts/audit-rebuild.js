#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const vm = require('node:vm');

function fail(message) {
  console.error(`AUDIT FAILED: ${message}`);
  process.exitCode = 1;
}

function assert(condition, message) {
  if (!condition) fail(message);
}

const sandbox = { window: {} };
vm.createContext(sandbox);

for (const file of ['data.js', 'data-patches.js']) {
  const source = fs.readFileSync(file, 'utf8');
  vm.runInContext(source, sandbox, { filename: file });
}

const data = sandbox.window.KFMH_DATA;
assert(data, 'window.KFMH_DATA was not created.');
if (!data) process.exit(1);

assert(Array.isArray(data.transformers), 'transformers must be an array.');
assert(Array.isArray(data.mdps), 'mdps must be an array.');
assert(data.transformers.length === 5, `expected 5 transformers, found ${data.transformers.length}.`);
assert(data.mdps.length === 5, `expected 5 MDPs, found ${data.mdps.length}.`);

const expectedMPCounts = { MDP1: 4, MDP2: 8, MDP3: 14, MDP4: 5, MDP5: 6 };
const allTags = new Set();

for (const transformer of data.transformers) {
  assert(/^TR[1-5]$/.test(transformer.id), `invalid transformer id ${transformer.id}.`);
  assert(Array.isArray(transformer.sourcePath) && transformer.sourcePath.length >= 3,
    `${transformer.id} must have a source path.`);
  assert(String(transformer.sourcePath[0]).startsWith('RMU'),
    `${transformer.id} source path must begin with RMU.`);
  assert(data.mdps.some(mdp => mdp.id === transformer.mdpId),
    `${transformer.id} references missing ${transformer.mdpId}.`);
}

for (const mdp of data.mdps) {
  assert(expectedMPCounts[mdp.id] === mdp.mps.length,
    `${mdp.id} expected ${expectedMPCounts[mdp.id]} MP panels, found ${mdp.mps.length}.`);
  assert(Array.isArray(mdp.sourcePath) && String(mdp.sourcePath[0]).startsWith('RMU'),
    `${mdp.id} source path must begin with RMU.`);

  const mpNumbers = new Set();
  for (const mp of mdp.mps) {
    assert(mp.id === `${mdp.id}-MP${mp.number}`,
      `${mp.id} does not match the MP numbering rule.`);
    assert(mp.tag === mp.id, `${mp.id} tag must equal its id.`);
    assert(!mpNumbers.has(mp.number), `${mdp.id} has duplicate MP number ${mp.number}.`);
    mpNumbers.add(mp.number);

    assert(!allTags.has(mp.tag), `duplicate tag ${mp.tag}.`);
    allTags.add(mp.tag);

    const expectedPPPrefix = `${mdp.id}.MP${mp.number}.PP`;
    mp.pps.forEach((pp, index) => {
      const expectedTag = `${expectedPPPrefix}${index + 1}`;
      assert(pp.tag === expectedTag,
        `${mp.tag} expected ${expectedTag}, found ${pp.tag}.`);
      assert(!allTags.has(pp.tag), `duplicate tag ${pp.tag}.`);
      allTags.add(pp.tag);
      assert(pp.location && typeof pp.location.ar === 'string' && typeof pp.location.en === 'string',
        `${pp.tag} must have Arabic and English location fields.`);
    });
  }
}

const mdp1 = data.mdps.find(x => x.id === 'MDP1');
assert(!mdp1.sourcePath.some(x => /FED|ATS/.test(x)), 'MDP1 must not contain FED or ATS.');

for (const id of ['MDP2', 'MDP3']) {
  const mdp = data.mdps.find(x => x.id === id);
  assert(mdp.sourcePath[0] === 'RMU1', `${id} must start from RMU1.`);
  assert(mdp.sourcePath.some(x => String(x).startsWith('FED')), `${id} must include FED.`);
  assert(mdp.sourcePath.some(x => String(x).startsWith('ATS')), `${id} must include ATS.`);
}

for (const id of ['MDP4', 'MDP5']) {
  const mdp = data.mdps.find(x => x.id === id);
  assert(mdp.mps.every(mp => mp.pps.length === 0),
    `${id} must not invent PP panels before downstream details are received.`);
}

const sourceFiles = ['index.html', 'app.js', 'extras.js', 'data.js', 'data-patches.js'];
const combined = sourceFiles.map(file => fs.readFileSync(file, 'utf8')).join('\n');
assert(!/api\.qrserver\.com|create-qr-code|page-qr-extra/.test(combined),
  'per-page or external QR generation code must not be present.');

const appSource = fs.readFileSync('app.js', 'utf8');
for (const field of ['TAG No.', 'SOURCE', 'LOCATION']) {
  assert(appSource.includes(field), `PP label field ${field} is missing from app.js.`);
}

const indexSource = fs.readFileSync('index.html', 'utf8');
for (const asset of ['styles.css', 'extras.css', 'data.js', 'data-patches.js', 'app.js', 'extras.js']) {
  assert(indexSource.includes(asset), `index.html does not load ${asset}.`);
}

if (!process.exitCode) {
  const mpCount = data.mdps.reduce((sum, mdp) => sum + mdp.mps.length, 0);
  const ppCount = data.mdps.reduce((sum, mdp) =>
    sum + mdp.mps.reduce((inner, mp) => inner + mp.pps.length, 0), 0);
  console.log(`AUDIT PASSED: ${data.transformers.length} TR, ${data.mdps.length} MDP, ${mpCount} MP, ${ppCount} PP.`);
}
