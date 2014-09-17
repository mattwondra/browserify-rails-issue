//= require_self
//= require "modules/a"
//= require "tools/noop1"
//= require "modules/b"
//= require "tools/noop2"
//= require "modules/c"

window._count = 0;
console.log("\n\nCounts when required with sprockets!");

// NOTE: The tools/noopN scripts just provide a semicolon buffer between concatenated
// browserify modules. Without this the concatenation breaks the script.