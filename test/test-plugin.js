import arbo from '../src';

export default async function testPlugin(path) {
  const result = [];
  const originalConsoleLog = console.log;
  console.log = (...x) => result.push(...x);

  await import(path);

  arbo(path);

  await import(path);
  console.log = originalConsoleLog;

  return result.join('\n');
}
