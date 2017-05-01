import { readdirSync, statSync, readFileSync } from 'fs';
import path from 'path';
import test from 'ava';
import clear from '../src';
import testPlugin from './test-plugin';

const FIXTURE_PATH = path.join(__dirname, 'fixtures');

const testFolders = readdirSync(FIXTURE_PATH).filter(file =>
  statSync(path.join(FIXTURE_PATH, file)).isDirectory(),
);

testFolders.forEach(folderName => {
  const expected = readFileSync(
    path.join(FIXTURE_PATH, folderName, 'expected.txt'),
    'utf8',
  );
  test.serial('Arbo', async t => {
    const result = await testPlugin(path.join(FIXTURE_PATH, folderName));

    t.is(
      result.trim(),
      expected.trim(),
      `works with ${folderName.split('-').join(' ')}`,
    );
  });
});

test("doesn't crash if module not found", t => {
  t.notThrows(() => clear('foo'));
});

test("doesn't crash if module not in require cache", t => {
  t.notThrows(() => clear('fs'));
});
