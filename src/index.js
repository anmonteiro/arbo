function resolve(id) {
  try {
    return require.resolve(id);
  } catch (_) {
    return null;
  }
}

function findDependentsForModule(id) {
  const queue = [id];
  const result = {};

  for (let i = 0; i < queue.length; i++) {
    const mid = queue[i];
    const module = require.cache[mid];

    if (module != null) {
      const children = module.children;

      for (const child of children) {
        const childid = child.id;

        if (result[childid] == null) {
          queue.push(childid);
        }
      }

      result[module.id] = true;
    }
  }

  return Object.keys(result);
}

module.exports = function clear(id, opts = {}) {
  const resolved = resolve(id);

  if (resolved != null) {
    const dependents = findDependentsForModule(resolved);

    for (const mid of dependents) {
      delete require.cache[mid];
    }
  }
};
