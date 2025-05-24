// sample.js
console.log('This is a sample JS file.');

// Helper: Capitalize first letter
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper: Deep clone an object
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Helper: Debounce
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Helper: Throttle
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Helper: Generate random string
function randomString(length = 8) {
  return Math.random().toString(36).substr(2, length);
}

// Helper: Check if value is empty
function isEmpty(val) {
  return (
    val == null ||
    (typeof val === 'string' && val.trim() === '') ||
    (Array.isArray(val) && val.length === 0) ||
    (typeof val === 'object' && Object.keys(val).length === 0)
  );
}

// Helper: Flatten array
function flatten(arr) {
  return arr.reduce(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  );
}

// Helper: Get unique values from array
function unique(arr) {
  return [...new Set(arr)];
}

// Helper: Sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper: Chunk array
function chunk(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

// Helper: Group by key
function groupBy(arr, key) {
  return arr.reduce((acc, obj) => {
    const group = obj[key];
    acc[group] = acc[group] || [];
    acc[group].push(obj);
    return acc;
  }, {});
}
