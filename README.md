browserify-rails-issue
======================

This is a reduced test case to illustrate two errors in the [browserify-rails](https://github.com/browserify-rails/browserify-rails) gem.

Our setup has a shared library module, `lib/counter`, which keeps a global count every time it's instantiated and exports that count.

We have three modules, `modules/a`, `modules/b`, and `modules/c`, whch all `require("../lib/counter")` and log the instantiation count to the browser.

But there are issues that can arise depending on how the modules are included in the parent script.

## Issue 1: Consecutive modules cause runtime error

This is highlighted in [sprockets_require_concat_error.js](https://github.com/mattwondra/browserify-rails-issue/blob/master/app/assets/javascripts/sprockets_require_concat_error.js): 

```
//= require "modules/a"
//= require "modules/b"
//= require "modules/c"
```

*[compiled script](https://github.com/mattwondra/browserify-rails-issue/blob/master/public/assets_compiled/sprockets_require_concat_error.js)*

When the three modules are consecutively required using Sprockets like this, the processed script throws the following runtime error:


```
Uncaught Error: Cannot find module 'function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}'
```

When you view the concatenated file, it looks like the root issue is caused by the modules being squished up next to each other without any whitespace or a semicolon in-between, a la:

```
/* ... end of first module ... */ ,{},[2])(function e(t,n,r){ /* ... start of second module ... */
```

It looks like this can be solved by simply inserting a semicolon between the modules:


```
/* ... end of first module ... */ ,{},[2]);(function e(t,n,r){ /* ... start of second module ... */
```


## Issue 2: Sprockets-required files don't share their modules

The next example is highlighted in [sprockets_require.js](https://github.com/mattwondra/browserify-rails-issue/blob/master/app/assets/javascripts/sprockets_require.js): 

```
//= require "modules/a"
//= require "tools/noop1"
//= require "modules/b"
//= require "tools/noop2"
//= require "modules/c"
```

*[compiled script](https://github.com/mattwondra/browserify-rails-issue/blob/master/public/assets_compiled/sprockets_require.js)*

Note that I've inserted `noop` scripts between the modules as a quick fix for Issue 1 above. However this suffers its own issues. If you look at the processed script, you notice that the shared `lib/counter` library is declared three times: once for each module. So it seems that because Sprockets processes each `//= require`-d file separately, there's no way for them to share common modules.

I know there are [documented ways around this](https://github.com/browserify-rails/browserify-rails#multiple-bundles) but it seems a huge burden to update a YAML config so heavily on a large project with many files and multiple shared dependencies. And while for many modules the worst case is your final file declares the same file many times (probably made negligent with gzip) — for others there are catastrophic results with initializing one library several times on the same page (React in particular).


## Expected output

I made a third example to show the expected output, [browserify_require.js](https://github.com/mattwondra/browserify-rails-issue/blob/master/app/assets/javascripts/browserify_require.js):

```
var module_a = require("./modules/a");
var module_b = require("./modules/b");
var module_c = require("./modules/c");
```

*[compiled script](https://github.com/mattwondra/browserify-rails-issue/blob/master/public/assets_compiled/browserify_require.js)*

By including the modules through Browserify, rather than sprockets, you get the desired result. Namely, the shared module `lib/counter` is instantiated exactly once and shared between the other modules.
