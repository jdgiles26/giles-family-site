// Builds api/_lib/seed.json from the bundled assets/js/data.js (run after editing data.js by hand).
import fs from 'node:fs'; import vm from 'node:vm';
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(new URL('../assets/js/data.js', import.meta.url), 'utf8'), ctx);
const people = ctx.window.FAMILY.people.map((p) => JSON.parse(JSON.stringify(p)));
fs.writeFileSync(new URL('../api/_lib/seed.json', import.meta.url), JSON.stringify({ people }, null, 0));
console.log('seed people:', people.length);
